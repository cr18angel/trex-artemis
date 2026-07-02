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
    modelo: "LIFTACE E 6/7 ECC 9",
    serie: "10001347980",
    parte: "94374087",
    parteRepuesto: "L5002",
    descripcion1: "ASSY PEDALS",
    precioVenta: "$2.671.796",
    precioMachineDown: "$3.082.791",
  }

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
