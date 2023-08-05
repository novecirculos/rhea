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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@novecirculos/design'
import { Scene } from '../server/scene-actions.types'
import { IconPlus } from '@/components/ui/icons'

const data: Scene[] = [
  {
    title: 'O Reino de Kiverlia',
    characters: ['Trenn', 'Arqui Arauto Osvaldo', 'Lorderon'],
    location: 'Kiverlia',
    objects: [
      'florestas densas',
      'montanhas imponentes',
      'rios e lagos sinuosos',
    ],
    categories: ['reino', 'natureza', 'clima'],
    events: [
      {
        description: 'long text',
        name: 'Chegada a catedral',
      },
      {
        description: 'long text',
        name: 'Discurso do arqui arauto',
      },
    ],
    content:
      'Kiverlia. O Reino de Kiverlia, resplandecente em seu poder e influência, está situado entre os reinos de Njord, a noroeste, e Olfsberg, a sudeste. Suas extensas e férteis terras são agraciadas com florestas densas, montanhas imponentes e rios e lagos sinuosos. O clima de Kiverlia é caracterizado por invernos gelados e verões sufocantes.',
  },
  {
    title: 'O Reino de Kiverlia',
    characters: ['Trenn', 'Arqui Arauto Osvaldo'],
    location: 'Kiverlia',
    objects: [
      'florestas densas',
      'montanhas imponentes',
      'rios e lagos sinuosos',
    ],
    categories: ['reino', 'natureza', 'clima'],
    events: [
      {
        description: 'long text',
        name: 'Chegada a catedral',
      },
      {
        description: 'long text',
        name: 'Discurso do arqui arauto',
      },
    ],
    content:
      'Kiverlia. O Reino de Kiverlia, resplandecente em seu poder e influência, está situado entre os reinos de Njord, a noroeste, e Olfsberg, a sudeste. Suas extensas e férteis terras são agraciadas com florestas densas, montanhas imponentes e rios e lagos sinuosos. O clima de Kiverlia é caracterizado por invernos gelados e verões sufocantes.',
  },
  {
    title: 'O Reino de Kiverlia',
    characters: ['Trenn', 'Arqui Arauto Osvaldo'],
    location: 'Kiverlia',
    objects: [
      'florestas densas',
      'montanhas imponentes',
      'rios e lagos sinuosos',
    ],
    categories: ['reino', 'natureza', 'clima'],
    events: [
      {
        description: 'long text',
        name: 'Chegada a catedral',
      },
      {
        description: 'long text',
        name: 'Discurso do arqui arauto',
      },
    ],
    content:
      'Kiverlia. O Reino de Kiverlia, resplandecente em seu poder e influência, está situado entre os reinos de Njord, a noroeste, e Olfsberg, a sudeste. Suas extensas e férteis terras são agraciadas com florestas densas, montanhas imponentes e rios e lagos sinuosos. O clima de Kiverlia é caracterizado por invernos gelados e verões sufocantes.',
  },
]

export const columns: ColumnDef<Scene>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        variant="secondary"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        variant="secondary"
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
        {row.getValue('characters').map((character: string) => (
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
        {row.getValue('categories').map((category: string) => (
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
        {row.getValue('events').map((event: any) => (
          <Badge variant="outline" key={event.name}>
            {event.name}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'content',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Conteúdo <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return `${row.getValue('content').substring(0, 100)}...`
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                /* action */
              }}
            >
              Editar cena
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                /* action */
              }}
            >
              Visualizar cena
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                /* action */
              }}
            >
              Deletar cena
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DashboardPage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar por titulo"
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="space-x-4">
          <Button variant="outline" className="ml-auto dark:border-gray-800">
            Novo registro <IconPlus className="ml-2 h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto dark:border-gray-800"
              >
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
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
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
