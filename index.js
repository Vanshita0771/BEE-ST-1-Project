
const express=require('express');
const app=express();
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
const fs=require('fs');
const { send } = require('process');
var send_data;
function gr(total_mark) { 
    const per=(total_mark*100)/500;
    if(per>=90)
     return 'A';
    else if(per<90&&per>=80)
      return 'B';
    else if(per<80&&per>=70)
      return 'C';
    else if(per<70&&per>=60)
      return 'D';
    else 
       return 'F';
}

app.post('/addapi',function(req,res){
    fs.readFile("./score_sheet.json","utf-8",(err,data)=>{
        if(err) 
         console.log("error in opening");
        else{
            const info=JSON.parse(data);
            var maths_mark=Number.parseInt(req.body.maths)
            var  hindi_mark=Number.parseInt(req.body.hindi)
            var english_mark=Number.parseInt(req.body.english)
            var science_mark=Number.parseInt(req.body.science)
            var punjabi_mark=Number.parseInt(req.body.punjabi)
            var total_mark=hindi_mark+maths_mark+english_mark+science_mark+punjabi_mark
            send_data={
                name:req.body.name,
                id:req.body.id,
                address:req.body.address,
                maths_marks:maths_mark,
                hindi_marks:hindi_mark,
                english_marks:english_mark,
                science_marks:science_mark,
                punjabi_marks:punjabi_mark,
                total_marks:total_mark,
                average_marks:total_mark/5,
                grade:gr(total_mark)
            }
            res.send("Name: "+send_data.name+"<br>"+"ID: "+send_data.id+"<br>"+"Address: "+send_data.address
            +"<br>"+ "Maths_marks: "+send_data.maths_marks+"<br>"+"Hindi_marks: "+send_data.hindi_marks
            +"<br>"+"Science_marks: "+send_data.science_marks+"<br>"+"Punjabi_marks: "+send_data.punjabi_marks
            +"<br>"+"English_marks: "+send_data.english_marks+"<br>"+"Total marks: "+send_data.total_marks
            +"<br>"+"Grade: "+send_data.grade);
           
             
            info.push(send_data);
            fs.writeFile("./score_sheet.json",JSON.stringify(info),(err)=>{
                if(err)
                    console.log("error");
                 else{
                     console.log("write file sucessful");
                 }
            })
        }
    })
    
});
app.listen(3007);


