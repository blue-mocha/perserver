const PerLike = require('../../models/user_like');


const resolvers = {
   //read
    Query: {
        GetLikes : async (root : any)=> {      
            const likes = await PerLike.find({userId : root.id});
            console.log(root)
            return likes;
          }
        },
    
    //creat,update,delete
    Mutation : {
       AddLike: async( root : any , {input} : any ) => {
         const {seq, title, startDate, endDate, place, thumbnail} = input;   
          
          const newPerLike = new PerLike({
            userId : root._id,
            seq : seq, 
            title :  title ,
            startDate :  startDate ,
            endDate :  endDate,
            place :  place ,
            thumbnail :  thumbnail,
          })
        const result = await newPerLike.save(); 
        return result; 
      },
      
       DeleteLike : async(root : any , args : any) => {
        if(args.userId === root.userId){
          await PerLike.findOneAndDelete({seq : args.seq});
          return {"message" : "Deleted"}
        }
       }
      }
    
  };

  export default resolvers;
