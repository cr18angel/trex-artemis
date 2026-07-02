export interface PartLookupResult {
  modelo: string
  serie: string
  parte: string
  parteRepuesto: string
  descripcion1: string
  precioVenta: string
  precioMachineDown: string
}

const mockParts: PartLookupResult[] = [
  {
    modelo: "Kia Rio",
    serie: "111111",
    parte: "L5002",
    parteRepuesto: "L5002",
    descripcion1: "Filtro de aceite motor Kia Rio",
    precioVenta: "$18.900",
    precioMachineDown: "$16.500",
  },
  {
    modelo: "Kia Rio",
    serie: "111111",
    parte: "L5002",
    parteRepuesto: "L5002-A",
    descripcion1: "Kit sello compatible Kia Rio",
    precioVenta: "$24.900",
    precioMachineDown: "$21.500",
  },
  {
    modelo: "Kia Rio",
    serie: "111111",
    parte: "L5002",
    parteRepuesto: "L5002-B",
    descripcion1: "Empaque tapa filtro Kia Rio",
    precioVenta: "$8.900",
    precioMachineDown: "$7.500",
  },
]

function normalizeSearchValue(value: string) {
  return value.trim().toLocaleLowerCase("es-CL")
}

export function searchPartsByModelSerieAndPart(
  modelo: string,
  serie: string,
  parte: string
): PartLookupResult[] {
  const normalizedModelo = normalizeSearchValue(modelo)
  const normalizedSerie = normalizeSearchValue(serie)
  const normalizedParte = normalizeSearchValue(parte)

  return mockParts.filter(
    (part) =>
      normalizeSearchValue(part.modelo) === normalizedModelo &&
      normalizeSearchValue(part.serie) === normalizedSerie &&
      normalizeSearchValue(part.parte) === normalizedParte
  )
}
