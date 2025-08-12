import { zodResolver } from '@hookform/resolvers/zod'
import InputMask from 'react-input-mask'
import { useFieldArray, useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { useCreateCompany } from '@/http/use-create-company'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { useCompanies } from '@/http/use-companies'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'

const createCompanySchema = z.object({
  name: z.string().min(3, { message: 'Inclua no mínimo 3 caracteres' }).max(200, { message: 'Inclua no máximo 200 caracteres' }),
  isConsortium: z.boolean(),
  consortiumMembers: z
    .array(
      z.object({
        companyId: z.uuid(),
        participation: z.coerce.number().min(0).max(100),
        isLeader: z.boolean(),
      }),
    )
    .optional(),
})

type CreateCompanyFormData = z.infer<typeof createCompanySchema>

export function CreateCompanyForm() {
  const { mutateAsync: createCompany } = useCreateCompany()

  const createCompanyForm = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema) as any,
    defaultValues: {
      name: '',
      isConsortium: false
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: createCompanyForm.control,
    name: 'consortiumMembers',
  })

  const { data: companies } = useCompanies()
  const [openById, setOpenById] = useState<Record<string, boolean>>({})

  async function handleCreateCompany({ name, isConsortium, consortiumMembers }: CreateCompanyFormData) {
    await createCompany({
      name,
      isConsortium,
      consortiumMembers: isConsortium ? consortiumMembers : undefined,
    })

    createCompanyForm.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Cadastre uma nova empresa no nosso sistema!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createCompanyForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createCompanyForm.handleSubmit(handleCreateCompany as any)}
          >
            <FormField
              control={createCompanyForm.control as any}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da empresa</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da empresa..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={createCompanyForm.control as any}
              name="isConsortium"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>É consórcio?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {createCompanyForm.watch('isConsortium') && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <FormLabel>Membros do consórcio</FormLabel>
                  <Button
                    type="button"
                    className="w-fit"
                    onClick={() =>
                      append({ companyId: '', participation: 0, isLeader: false })
                    }
                  >
                    Adicionar membro
                  </Button>
                </div>

                {fields.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Nenhum membro adicionado.
                  </p>
                )}

                <div className="flex flex-col gap-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 gap-3 md:grid-cols-12">
                      <FormField
                        control={createCompanyForm.control as any}
                        name={`consortiumMembers.${index}.companyId`}
                        render={({ field: controlField }) => {
                          const selectedName = companies?.find((c) => c.id === controlField.value)?.name
                          const rowId = fields[index]?.id ?? String(index)
                          const isOpen = openById[rowId] ?? false
                          return (
                            <FormItem className="md:col-span-6">
                              <FormLabel>Empresa</FormLabel>
                              <FormControl>
                                <Popover
                                  open={isOpen}
                                  onOpenChange={(open) =>
                                    setOpenById((prev) => ({ ...prev, [rowId]: open }))
                                  }
                                >
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" className="justify-between">
                                      {selectedName ?? 'Selecione uma empresa...'}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="p-0">
                                    <Command>
                                      <CommandInput placeholder="Buscar empresa..." />
                                      <CommandEmpty>Nenhuma empresa encontrada.</CommandEmpty>
                                      <CommandList>
                                        {companies?.map((company) => (
                                          <CommandItem
                                            key={company.id}
                                            value={company.name}
                                            onSelect={() => {
                                              createCompanyForm.setValue(
                                                `consortiumMembers.${index}.companyId` as any,
                                                company.id,
                                                { shouldValidate: true, shouldDirty: true },
                                              )
                                              setOpenById((prev) => ({ ...prev, [rowId]: false }))
                                            }}
                                          >
                                            {company.name}
                                          </CommandItem>
                                        ))}
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )
                        }}
                      />

                      <FormField
                      control={createCompanyForm.control}
                      name={`consortiumMembers.${index}.participation`}
                      render={({ field }) => (
                          <FormItem className="md:col-span-3">
                          <FormLabel>Participação</FormLabel>
                          <FormControl>
                              <InputMask
                              mask="99,99%"
                              maskChar=""
                              value={field.value ?? ""}
                              onChange={(e) => {
                                  // Remove % e converte para número com ponto decimal
                                  const numericValue = e.target.value
                                  .replace("%", "")
                                  .replace(",", ".")
                                  .trim();
                                  field.onChange(numericValue);
                              }}
                              >
                              {(inputProps: any) => (
                                  <Input
                                  {...inputProps}
                                  inputMode="decimal"
                                  placeholder="00,00%"
                                  />
                              )}
                              </InputMask>
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />

                      <FormField
                        control={createCompanyForm.control as any}
                        name={`consortiumMembers.${index}.isLeader`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Líder?</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="md:col-span-1 flex items-end">
                        <Button
                          type="button"
                          className="w-full"
                          onClick={() => remove(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button className="w-full" type="submit">
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}