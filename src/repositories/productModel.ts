export interface ProductModel {
  findAll(): Promise<any[]>
  findOne(args: unknown): Promise<any>
  create(args: unknown): Promise<any>
  update(...args: unknown[]): Promise<any>
  destroy(args: unknown): Promise<number>
}
