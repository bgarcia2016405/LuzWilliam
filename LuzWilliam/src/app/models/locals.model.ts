export class Local{
  constructor(
    public _id: String,
    public nombre:String,
    public apellido: String,
    public local: Number,
    public focos: Number,
    public precioUnidad: Number,
    public precioTotal: Number,
    public debe: Number,
    public year: String,
    public estado: String,
    public cuotas:[{
      cantidad:Number,
      fecha:String
    }]
    ){}
}
