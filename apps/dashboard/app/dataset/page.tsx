"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoveUpRight, List } from "lucide-react";
import Textarea from "react-textarea-autosize";

import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@novecirculos/design";
import { Article } from "../server";
import { IconEdit, IconPlus, IconTrash } from "@/components/ui/icons";
import { api, fetcher } from "@/lib/utils";
import Link from "next/link";

const columns: ColumnDef<Article>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mt-1"
        variant="outline"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        variant="outline"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "metadata.title",
    header: "Título",
  },
  {
    accessorKey: "metadata.slug",
    header: "Slug",
  },

  {
    accessorKey: "metadata.category",
    header: "Categoria",
  },
  {
    header: "Ações",
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="dark:border-gray-800"
            >
              <List />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-48 flex flex-col px-4"
            align="end"
          >
            <Link
              className="flex flex-1 items-center py-4 gap-1"
              href={`/articles/${row.original.id}`}
            >
              <MoveUpRight size={14} /> Visualizar
            </Link>
            <Link
              className="flex flex-1 items-center py-4 gap-1"
              href={`/articles/${row.original.id}`}
            >
              <IconEdit fontSize={16} /> Editar
            </Link>
            <Link
              className="flex flex-1 items-center py-4 gap-1"
              href={`/articles/${row.original.id}`}
            >
              <IconTrash fontSize={16} /> Excluir
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DatasetDashboardPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Article[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetcher(`${api}/retrieval`);

      setData(response.data);
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableMultiSort: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full px-6">
      <div className="flex flex-wrap items-center justify-between py-4">
        <Input
          placeholder="Filtrar por titulo"
          value={
            (table.getColumn("metadata.title")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) => {
            table
              .getColumn("metadata.title")
              ?.setFilterValue(event.target.value);
          }}
          className="md:max-w-sm"
        />
        <div className="flex w-full h-full flex-col md:max-w-md md:flex-row md:justify-end md:space-x-4">
          {Object.entries(rowSelection).length > 0 && (
            <Button className="dark:border-gray-800" variant="outline">
              {" "}
              <IconEdit className="mr-1" /> Editar{" "}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="dark:border-gray-800">
                Colunas visíveis <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Novo registro <IconPlus className="ml-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar novo registro ao dataset</DialogTitle>
                <DialogDescription>
                  Esse documento será formatado por um modelo de linguagem,
                  transformando esse input em uma cena. Você poderá editar as
                  informações depois.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Conteúdo
                  </Label>
                  <Textarea
                    tabIndex={0}
                    rows={1}
                    placeholder="Cole aqui o conteúdo que deseja enviar."
                    spellCheck={false}
                    className="focus-within:ring-accent col-span-3 max-h-96 w-full resize-none rounded-sm border-gray-200 bg-transparent px-4 py-[1.3rem] focus-within:outline-none dark:border-gray-800 dark:text-gray-50 sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-left">
                    Categoria
                  </Label>
                  <Select defaultValue="transcription">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione uma categoria de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorias de documento</SelectLabel>
                        <SelectItem value="article">Artigo</SelectItem>
                        <SelectItem value="transcription">
                          Transcrição
                        </SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Enviar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table className="border dark:border-gray-800">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.original.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} valores(s) selecionados.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Voltar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
