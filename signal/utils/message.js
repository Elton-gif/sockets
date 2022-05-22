let generate =(from,text)=>{
    return{
        from,
        text,
        createdAt :new Date().getTime(),
    }
}

module.exports =(generate);


//Function testing with mocha