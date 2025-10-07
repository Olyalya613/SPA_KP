import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name:'filterByFieldImpure',standalone:true,pure:false})
export class FilterByFieldImpurePipe implements PipeTransform{transform(items:any[]|null|undefined,field: string,query:string|undefined|null){if(!Array.isArray(items))return[];if(!query)return items;const q=String(query).toLowerCase().trim();const key=String(field);return items.filter(it=>String(it?.[key]??'').toLowerCase().includes(q));}}
