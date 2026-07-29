function findSubtitle(files, name){

    let clean=name.toLowerCase();


    for(let file of files){

        if(file.name.toLowerCase().includes(clean)){

            return file.id;

        }

    }


    return null;

}


module.exports=findSubtitle;