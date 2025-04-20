'use server'
import { Book as prismaBook, Order, OrderBooks, Prisma, PrismaClient } from "@prisma/client"
import { Address, Book, User } from "./datatypes";
import { number, string, z } from "zod";
import { revalidatePath } from "next/cache";
import { deleteImageCloud } from "./common";
import bcrypt from "bcrypt"
import { createSession, verifySession } from "./session";
import { GetDateIdForRecord } from "./common";
import { hash } from "bcrypt";
import internal from "stream";
import { Arapey } from "next/font/google";
import { Genres } from "./commonCli";
import { IsLogin } from "./auth";
const prisma = new PrismaClient();
type BookType = z.infer<typeof Book>
type BookTypeOptiona = {
    name?: string;
    author?: string;
    price?: number;
    qty?: number;
    description?: string;
    image?: string;
    genres?: string;
    id?: number | undefined;
    ebook:boolean;
}
type user  = z.infer<typeof User>
type address = z.infer<typeof Address>
export async function AddNewBookToDB(data:BookType){
    const valid = Book.safeParse(data)
    if(valid.error){
        return  {error:valid.error.errors,sucess:false};
    }
    try{
        await prisma.book.create({data})
        revalidatePath('/admin/books','page')
        return {sucess:true, error:[]}
    }catch(e){
        if(e instanceof Error){
            return {error:[`${e.name}-${e.message}`],sucess:false}
        }
        return {error:["some unkonwn error occured"],sucess:false}
    }
    
}

export async function GetAllBooks(search:string=''):Promise<{error:string[],sucess:boolean,data:BookType[],recommendations:number[]}>{
    try{
        let data:BookType[];
        let recommendation_ids:number[] = [];
        if(!search){
            data = await prisma.book.findMany({
                take: 8
            });
        }else {
            const hash_id:{[key:string]:number} = {}
            recommendation_ids = await GetRecommendation(search);
            recommendation_ids.forEach(e=>hash_id[e] = 1)
            data = await prisma.book.findMany({ where: {
                OR: [
                  {
                    name: {
                      contains: search, 
                      mode: 'insensitive', 
                    },
                  },
                  {
                    author: {
                      contains: search, 
                      mode: 'insensitive', 
                    },
                  },
                  {
                    id:{
                        in:recommendation_ids
                    }
                  }
                ],
              },
           })
        }
        data.sort((a, b) => {
            const aMatches = a.name.toLowerCase().includes(search.toLowerCase());
            const bMatches = b.name.toLowerCase().includes(search.toLowerCase());            
            if (aMatches && !bMatches) return -1;
            if (!aMatches && bMatches) return 1;
            return 0;
          });
        revalidatePath('/admin/books','page')
        return {error:[""],sucess:true,data,recommendations:recommendation_ids}
    }catch(e){
        if(e instanceof Error){
            return {error:[`${e.name}-${e.message}`],sucess:false,data:[],recommendations:[]}
        }
        return {error:["some unkonwn error occured"],sucess:false,data:[],recommendations:[]}
    }
}

export async function getCartBookDB(ids:number[]):Promise<{sucess:boolean,data:BookType[],error:string[]}>{
    try{
        if(ids.length == 0) return {data:[],error:[],sucess:true}
        const data = await prisma.book.findMany({where:{id:{in:ids}}});
        return {sucess:true,error:[], data};
    }catch(e){
        if(e instanceof Error){
            return {error:[`${e.name}-${e.message}`],sucess:false,data:[]}
        }
        return {error:["some unkonwn error occured"],sucess:false,data:[]}
    }
}

export async function DeleteBook(id:number){
    try{
        const data = await prisma.book.delete({where:{id}});
        deleteImageCloud(data.image)
        revalidatePath('/admin/book','layout')
        return {sucess:true,error:[]};
    }catch(e){
        if(e instanceof Error){
            return {error:[`${e.name}-${e.message}`],sucess:false}
        }
        return {error:["some unkonwn error occured"],sucess:false}
    }
}

export async function UpdateBook(data:BookTypeOptiona){
    try{
        await prisma.book.update({
            where:{id:data.id},
            data    
        });
        revalidatePath('/admin/book','layout')
        return {sucess:true,error:""};
    }catch(e){
        if(e instanceof Error){
            return {error:`${e.name}-${e.message}`,sucess:false}
        }
        return {error:"some unkonwn error occured",sucess:false}
    }
}

export async function SignUpDB(data:user){
    try{
        const password = await bcrypt.hash(data.password,12);
        const user = {email:data.email, password,admin:false}
        const req = await prisma.user.create({data:user})
        await createSession(req.id);
        revalidatePath("/admin/user",'layout')
        return {error:"",success:true , data:req}
    }catch(e){
        if(e instanceof Error){
            if('code' in e && e?.code == "P2002") return {error:"Email alrady exist",success:false};
            return {error:e.message,success:false};
        }
        return {error:"some error occured",success:false};
    }
}

export async function SignInDB(data:user){
    try{
        const email = data.email;
        const user = await prisma.user.findUnique({where:{email}})
        if(!user){
            return {error:"Invalid creditionals",success:false,id:null};
        }
        const comp = await bcrypt.compare(data.password,user.password);
        if(!comp){
            return {error:"Invalid creditionals",success:false,id:null};
        }
        return {error:"",success:true,id:user.id,admin:user.admin}; 
    }catch(e){
        if(e instanceof Error)
            return {error:e.name,success:false}; 
        return {error:"something went wrong signin",success:false,id:null,admin:false}; 
    }
}

export async function getUsers(){
    try{
        const data = await prisma.user.findMany({})
        return {error:'',success:true,data}; 
    }catch(e){
        if(e instanceof Error)
            return {error:e.name,success:false,data:null}; 
        return {error:"something went wrong signin",success:false,data:[]}; 
    }
}

export async function ToogleAdmin(id:number,value:boolean) {
    try{
        const data = await prisma.user.update({where:{id},data:{admin:value}})
        return {error:'',success:true}; 
    }catch(e){
        if(e instanceof Error)
            return {error:e.name,success:false}; 
        return {error:"something went wrong signin",success:false}; 
    }
}

export async function AddAdressDB(address:address) {
    try{
        const data = await prisma.address.create({data:address,});
        return {error:'',success:true}; 
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false}; 
        return {error:"something went wrong signin",success:false}; 
    }
}

export async function AddRecord(total:number){
    try{    
        const id = await GetDateIdForRecord();
        const req = await prisma.record.upsert({
            where:{
                id:id
            },
            update:{
                total:{increment:total}
            },
            create:{
                id,
                total
            }
        })
        return {error:"",success:true}; 
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false}; 
        return {error:"something went wrong",success:false}; 
    }
}

export async function AddGenresRecord(data:{[genres:string]:number}) {
    try{    
        const id = await GetDateIdForRecord(false);
        const req = Object.keys(data).map(genres=>{
            return  prisma.record_Genres.upsert({
                where:{
                    id_name: { 
                        id: id,
                        name: genres,
                    },
                },
                update:{
                    total:{increment:data[genres]}
                },
                create:{
                    id,
                    name:genres,
                    total:data[genres]
                }
            })
        })
        await Promise.all(req);
        return {error:"",success:true}; 
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false}; 
        return {error:"something went wrong",success:false}; 
    }
}

export async function OrderPlaceDB(order:{[book_id:string]:{qty:number,ebook:boolean}},userId:number,addressId:number) {
    let OrderBooks ;
    let total = 0;
    let genres_qty:{[genres:string]:number}= {}
    const orderIds = Object.keys(order).map(e=>parseInt(e)).filter(e=>!isNaN(e))
    const books = await prisma.book.findMany({where:{id:{in:orderIds}}})
    books.forEach(e=>{
        if(e.genres in Genres)
            genres_qty[e.genres] += 1;
        else 
            genres_qty[e.genres] = 1;
        total+= e.price * order[e.id]['qty']
    })
    try{
        await prisma.$transaction(async(tx)=>{
            const req = await tx.order.create({data:{total,userId,address_id:addressId}})
            OrderBooks = books.reduce((acc,e:BookType)=>{
                if(e.qty >= order[`${e.id}`]['qty'])
                    acc.push({book_id:e.id as number,order_id:req.id,cost:e.price,qty:order[e.id!]['qty'],status:(order[e.id!]['ebook'] ? "Complete" : "Pending")})
                return acc
            },[] as any[]) // i don't want to create more data type so i just set this to any, fuck this - bhargav
            Object.keys(order).filter(e=>order[e]['ebook']).forEach(async (bookID,i)=>{
                    await tx.ebook.create({data:{userid:userId,bookid:parseInt(bookID)}})
            })
            Object.keys(order).filter(id=>!order[id]['ebook']).forEach(async (bookID,i)=>{
                await tx.book.update({
                    where:{
                        id:parseInt(bookID)
                    },
                    data:{
                        qty:{ decrement:order[parseInt(bookID)]['qty'] }
                    }
                })
            })
            const req_record = await AddRecord(total)
            if(!req_record.success) throw new Error(req_record.error)
                const req_genres = await AddGenresRecord(genres_qty)
            if(!req_genres.success) throw new Error(req_record.error)
            await tx.orderBooks.createMany({data:OrderBooks})
        })
        return {error:"",success:true}; 
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false}; 
        return {error:"something went wrong signin",success:false};     
    }
}
    
export async function GetAddress(){
    try{
        const {user,session} = await verifySession();
        if(!session)  return {error:`Sign in first`,success:false,data:[]}; 
        const address = await prisma.address.findMany({where:{user_id:user}})
        return {error:``,success:true,data:address}; 
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false,data:[]}; 
        return {error:"something went wrong signin",success:false,data:[]}; 
    }
}

export async function DeleteAddress(id:number){
    try{
        const {session} = await verifySession();
        if(!session)  return {error:`Sign in first`,success:false}; 
        await prisma.address.delete({where:{id}})
        return {error:``,success:true}; 
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false,}; 
        return {error:"something went wrong signin",success:false,}; 
    }
}
type OrderWithBooks = Order & {
    orderBooks: (OrderBooks & { book: prismaBook})[],
    address:address
  };
export async function GetOrders(page:number = 1): Promise<{ error: string; success: boolean; data: OrderWithBooks[],count:number }> {
    try{
        const {session,user} = await verifySession();
        if(!session)  return {error:`Sign in first`,success:false,data:[],count:0}; 
        const data = await prisma.order.findMany({
            where:{userId:user},
            include:{
                orderBooks:{
                    include:{
                        book:true
                    },
                },
                address:true
            },
            skip: (page - 1) * 10,
            take: 10,
            orderBy: {
                date: 'desc' 
            }
        })
        const count = await prisma.book.count();
        return {error:"",success:true,data,count};
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false,data:[],count:0}; 
        return {error:"something went wrong signin",success:false,data:[],count:0}; 
    }
}


export async function GetBookByIDDB(id:number): Promise<{ error: string; success: boolean; data: BookType|null , Recommendation:BookType[] | []}> {
    try{
        let data = null;
        const recommendation_ids = await GetRecommendation("",id)
        let Recommendation:any = []
        console.log('error',recommendation_ids)
        Recommendation = await prisma.book.findMany({
            where:{
                id:{in:[id,...recommendation_ids]}
            }
        })
        if(!Recommendation) Recommendation = []
        Recommendation =Recommendation.filter((e:{id:number})=>{
            if(e.id == id)
                data = e;
            else 
                return e
        })
        if(!Recommendation) Recommendation = []
        return {error:"",success:true,data ,Recommendation};
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false,data:null,Recommendation:[]}; 
        return {error:"something went wrong signin",success:false,data:null,Recommendation:[]}; 
    }

}
export async function GetBookByIDsDB(ids:number[]): Promise<{ error: string; success: boolean; data: BookType[]}> {
    try{
        let data = [];
        data = await prisma.book.findMany({
            where:{
                id:{in:ids}
            }
        })
        return {error:"",success:true,data:data};
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false,data:[]}; 
        return {error:"something went wrong signin",success:false,data:[]}; 
    }
}

export async function GetSingleUser(id:number){
    try{
        let data = await prisma.user.findFirst({where:{id}})
        return {error:"",success:true,data};
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false,data:null}; 
        return {error:"something went wrong signin",success:false,data:null}; 
    }
}
export async function GetAllOrders(){
    try{
        let data = await prisma.orderBooks.findMany({
            include:{
                book:true
            }
        })
        return {error:"",success:true,data};
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false,data:null}; 
        return {error:"something went wrong signin",success:false,data:null}; 
    }
}

export async function UpdateOrderDB(id:number,value:string):Promise<{error:string,success:boolean,data: {
    id: number;
    book_id: number;
    order_id: number;
    cost: number;
    qty: number;
    status: string;
}|null}>{
    try{
        const data = await prisma.orderBooks.update({
            where:{id},
            data:{status:value}
        })
        return {error:"",success:true,data};
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false, data:null}; 
        return {error:"something went wrong signin",success:false, data:null}; 
    }
}

export async function GetTotalBookForRazor(data:{[book_id:string]:{qty:number,ebook:boolean}}) {
    try{    
        let total = 0;
        const bookID = Object.keys(data).map(e=> parseInt(e));
        const books_found = await prisma.book.findMany({
            where:{id:{in:bookID}}
        })
        books_found.forEach(e=>{
            total += e.price*data[e.id]['qty']
        })
        return {error:``,success:true, data:total}; 
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false, data:null}; 
        return {error:"something went wrong",success:false, data:null}; 
    }
}

export async function GetRecord(year:number){
    let MonthsPerYear = Array(12).fill(0);
    let DaysPerYear:{[key:string]:number[]}   = {}
    for(let i = 1 ; i <= 12 ; i++)
        DaysPerYear[i] = Array(31).fill(0)
    try{    
        let data = await prisma.record.findMany({
            where:{
                id:{
                    endsWith:`-${year}`,
                }
            }
        })
        data.forEach(e=>{
            let [dd,mm,yyyy] = e.id.split("-");
            MonthsPerYear[parseInt(mm)] = e.total;
            DaysPerYear[parseInt(mm)][parseInt(dd)] = e.total 
        })
        return {error:"",success:true, data:{DaysPerYear,MonthsPerYear}}; 
    }catch(e){
        if(e instanceof Error)
            return {error:`${e.name}-${e.message}`,success:false, data:{DaysPerYear,MonthsPerYear}}; 
        return {error:"something went wrong",success:false, data:{DaysPerYear,MonthsPerYear}}; 
    }
}

export async function GetRecordGenres(year: number): Promise<{ error: string, success: boolean, data: [string[], number[]][] }> {
  // Initialize hash with empty arrays for each month
  const hash: [string[], number[]][] = Array.from({ length: 12 }, () => [[], []]);

  try {
    // Fetch data from the database
    const data = await prisma.record_Genres.findMany({
      where: {
        id: {
          endsWith: `-${year}`
        }
      }
    });

    data.forEach(e => {
      const yy = parseInt(e.id.split('-')[0]);
      if (yy >= 0 && yy < 12) { 
        hash[yy][0].push(e.name);
        hash[yy][1].push(e.total);
      }
    });
    return { error: '', success: true, data: hash };
  } catch (e) {
    if (e instanceof Error) {
      return { error: `${e.name}-${e.message}`, success: false, data: hash };
    }
    return { error: 'Something went wrong', success: false, data: hash };
  }
}

export async function GetRecommendation(title:string,id:number = -1):Promise<number[]>{
    try {
        // Fetch data from the database
        let data;
        let param;
        if(id!= -1)
            param = `?id=${id}`
        else
            param = `?query=${title}`
        const req = await fetch(`${process.env.RECOMMENDATION_API}/recommendations${param}`, {
            method: 'GET',
            headers: {
            //   "auth":`${process.env.RECOMMENDATION_AUTH}`,
            },
            cache: 'no-store',
          })
          const res = await req.json()
          if('error' in res)
                throw new Error(res['error'])
          let ids = JSON.stringify(res['data']);
          return ids.slice(1, -1).split(',').map(e=>parseInt(e));
    } catch (e) {
      return [];
    }
}

export async function GetBooksInRange(start:number,end:number):Promise<{data:BookType[],success:boolean}>{
    try{
        const data = await prisma.book.findMany({
            skip:start,
            take:end-start
        })
        return {data,success:true}
    } catch (e) {
        return {data:[],success:false};
    }

}
export async function GetBookTitleSimilar(title:string):Promise<{data:{[key:string]:number},success:boolean}>{
    try{
        let data = await prisma.book.findMany({
            where:{
                name:{
                    contains:title,
                    mode: 'insensitive',
                }
            },
            select:{name:true,id:true}
        })
        const id:{[key:string]:number} = {}; 
        data.forEach(e=>{
            id[e.name] = e?.id
        })
        return {data:id,success:true,}
    } catch (e) {
        return {data:{},success:false};
    }
}

export async function UpdateEbookDataBase(id:number,setValue:boolean):Promise<{success:boolean,error:string}>{
    try{
        await prisma.book.update({
            where:{ 
                id
            },
            data:{
                ebook:setValue
            }
        })
        return {success:true,error:""}
    } catch (e) {
        if(e instanceof Error)
            return {success:false,error:e.message};
        return {success:false,error:"Error occured while uploading ebook"};
    }
}

export async function GetEBooks():Promise<{success:boolean,error:string,data:BookType[]}>{
    try{
        const data = await prisma.book.findMany({
            where:{ 
                ebook:true
            }
        })
        return {success:true,error:"",data}
    } catch (e) {
        if(e instanceof Error)
            return {success:false,error:e.message,data:[]};
        return {success:false,error:"Error occured while uploading ebook",data:[]};
    }
}

export async function GetAllEBookForUser(bookID?:number):Promise<{[bookID:number]:number} | boolean> {
    // function to get all ebook user current signed in user bough
    // take bookID and check if user has that bought that book 
    try{
        const {user} = await IsLogin();
        if(bookID){
            const req = await prisma.ebook.findFirst({ 
                where:{
                    bookid:bookID,
                    userid:user
                } 
            })
            if(req)
                return true
            return false;
        }
        const req = await prisma.ebook.findMany({
            where:{
                userid:user
            }
        })
        let hash:{[key:number]:number} = {};
        req.forEach(e=>{
            hash[e.bookid] = 1;
        })
        return hash;
    }catch(e){
        return {};
    }
}