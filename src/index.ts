import app from "./app";

app.listen(app.get('port'), ()=>{
    console.log(`<---- APP RUNING ON PORT ${app.get('port')} ---->`)
})