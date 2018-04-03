

export class Constants {

    private readonly products = ["Tarjetas de crédito", "Seguros de auto","Créditos personales","Seguros de vida","Inversiones","Inmuebles"];
    public isFromClentProductDetail: boolean = false;


    public getProductTypeById = (index: number):string => {
        return this.products[index];
    }
}