const fs = require('fs'); // provides interaction between file system

const path = require('path'); // provides path related methods 

let collectionof = 'E:/webdevelopment/practice'; // root directory path 

let envpath = '';

function Collection(dirpath) {
    

    const files =  fs.readdirSync(dirpath);   // readdir method gives the files and folders in directory.
    
    console.log('files in:', dirpath, files);
    
    let parentname = dirpath.split('/').pop();
    
    

    files.map(file =>{
        let typechecker = path.join(dirpath, file);
        console.log(`file of ${parentname}`,typechecker);

        const stat = fs.lstatSync(typechecker);
       
        if(stat.isFile()) {

            let fileextension = file.split('.').pop();

            if (parentname === fileextension) {
                console.log('already grouped \n')
                return;
            }
            
            let oldpath =  path.join(dirpath, file); // path of the file
            let exitdir = path.join(dirpath, fileextension);   // variable for folder name in dirpath
            let newpath = path.join(exitdir, file); //path where to move file
            
            //if folder doesn't exists
            if (!fs.existsSync(exitdir)) {
                fs.mkdir(exitdir, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                move(oldpath, newpath); //moves file to grouped folder
            }
        
            else {
                move(oldpath, newpath); //moves file to grouped folder if groped folder already exists.
            }
        } 
        // case: - if there is folder in dirpath;
        else if(stat.isDirectory()){
            
             //every time this block executes the envpath initaes to ''
            // console.log(envpath);
            try{
            envpath += `/${file}`;
            // console.log('this file is an directory: ',envpath, '\n');
            let newargpath = collectionof + envpath;
            
            
            Collection(newargpath);  //needs to give fullpath
            
            let after = envpath.split('/');
            after.pop();
            let newafter = after.join('/')    

            envpath = newafter;
            
            
            }
            catch(err){
                console.log('\n',err.message, '\n');
            }
           
        }
});
    
}

// function to move files.
function move(oldpath, newpath) {
    fs.rename(oldpath, newpath, (err) => {
        if (err) {
            return console.log('Error moving file:', err.message);
        }
        console.log(`Moved ${oldpath} to ${newpath}`);
    });
}
Collection(collectionof);


