'use client'

import * as React from 'react'
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
} from '@tanstack/react-table'
import { Eye, ChevronDown, MoveUpRight } from 'lucide-react'
import Textarea from 'react-textarea-autosize'

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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@novecirculos/design'
import { Scene } from '../server/scene-actions.types'
import { IconPlus } from '@/components/ui/icons'
import { api, fetcher } from '@/lib/utils'
import Link from 'next/link'

export const columns: ColumnDef<Scene>[] = [
  {
    id: 'select',
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
    accessorKey: 'title',
    header: 'Título',
  },
  {
    accessorKey: 'characters',
    header: 'Personagens',
    cell: ({ row }) => (
      <div>
        {(row.getValue('characters') as string[]).map((character: string) => (
          <Badge variant="outline" key={character}>
            {character}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Localização',
  },
  {
    accessorKey: 'categories',
    header: 'Categorias',
    cell: ({ row }) => (
      <div>
        {(row.getValue('categories') as string[]).map((category: string) => (
          <Badge variant="outline" key={category}>
            {category}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'events',
    header: 'Eventos',
    cell: ({ row }) => (
      <div>
        {(row.getValue('events') as Event[]).map((event: any) => (
          <Badge variant="outline" key={event.name}>
            {event.name}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'content',
    header: 'Conteúdo',
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <p>{`${(row.getValue('content') as string).substring(
              0,
              100,
            )}...`}</p>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-md">{`${(
              row.getValue('content') as string
            ).substring(0, 400)}...`}</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/scenes/${row.original.id}`}>
          <Tooltip>
            <TooltipTrigger>
              <MoveUpRight className="h-4 w-4 text-gray-950 dark:text-gray-50" />
            </TooltipTrigger>
            <TooltipContent>Visualizar</TooltipContent>
          </Tooltip>
        </Link>
      )
    },
  },
]

export default function ScenesDashboardPage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<Scene[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetcher(`${api}/format/scene`)

      setData(response.scenes)
    }

    fetchData()
  }, [])

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full px-6">
      <div className="flex flex-wrap items-center justify-between py-4">
        <Input
          placeholder="Filtrar por titulo"
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            table.getColumn('title')?.setFilterValue(event.target.value)
          }}
          className="md:max-w-sm"
        />
        <div className="flex w-full flex-col md:max-w-md md:flex-row md:justify-end md:space-x-4">
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
                  )
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
                  Esse documento será formatado por um modelo de linguagem e
                  você poderá editar as informações depois.
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
                )
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
                  data-state={row.getIsSelected() && 'selected'}
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
              )
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
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
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
  )
}
