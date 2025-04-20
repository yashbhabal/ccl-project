
type AsyncFunction<T=any> = (...args:any[])=>Promise<T>;
type Result<T> = {
    data?:any,
    error?:string,
} | Awaited<T>

export async function ErrorHandle<T>(func:AsyncFunction<T>, ...params: any[]):Promise<Result<T>>{
    try{
        const result = await func(...params);
        return result;
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.name} - ${e.message}`}
        }
        return {error:"an Unknown error occured"}
    }
}
