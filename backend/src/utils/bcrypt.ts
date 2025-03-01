import bcrypt from "bcrypt"

export const hashValue= async(value:string,saltRound?:number):Promise<string>=>{
   return  bcrypt.hash(value,saltRound ||10);
}

export const compareValue=async (value:string,hashValue:string):Promise<boolean>=>{
     return bcrypt.compare(value,hashValue).catch(()=>false);

}