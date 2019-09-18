const sentenceTag = document.querySelector('#sentence')
const decryptBtn = document.querySelector('#decrypt-btn')
const submitTag = document.querySelector('#submitBtn')
const formm = document.querySelector('#pwordForm')
const about = document.querySelector('#lAbout')
const create = document.querySelector('#lCreate')
const decryptt = document.querySelector('#lDecrypt')
const numKey = [7,2,0,6,4,9,1,8,3,5]
const charKey = [':','_','@','#','?','~','-','=','.','#']
const passSus = [":V;&2d", "Z>/cmf", "0Y%Fe@", "[G=PNS", "+2;%mJ", "V\"g7L#", "7hDkVJ", "gTwCtP", "+9K*g6", ""]
// About Tool clicked
about.addEventListener('click', ()=> { 
    location.hash = '#about'
    location.reload('index.html'+location.hash)
    
})

// Encrypt Password clicked
create.addEventListener('click', ()=> {
    location.hash = '#create'
    location.reload('index.html'+location.hash)
})

// Decrypt Password clicked
decryptt.addEventListener('click', ()=> {
    location.hash = '#decr'
    location.reload('index.html'+location.hash)
    
})

// On page load
window.addEventListener('load', ()=>{
    if(location.hash == '#about' || location.hash == ''){
        document.getElementById('encrypt-area').style.display = "none";
        document.getElementById('decrypt-area').style.display = "none";
        document.getElementById('welcome-text').style.display = "block";
        

    }else if(location.hash == '#create'){
        document.getElementById('welcome-text').innerHTML = ''
        document.getElementById('welcome-text').style.display = "none";
        document.getElementById('decrypt-area').style.display = "none";
        document.getElementById('encrypt-area').style.display = "block";
        
    } else if (location.hash == '#decr'){
        document.getElementById('welcome-text').innerHTML = ''
        document.getElementById('welcome-text').style.display = "none";
        document.getElementById('encrypt-area').style.display = "none";
        document.getElementById('decrypt-area').style.display = "block";
        
    }
})

/**
 * When encrypt button pressed
 */
formm.addEventListener('submit', function(e){
    e.preventDefault()
    document.querySelector('#result').innerHTML = ''
    let password = complexConvert(sentenceTag.value)
    //convertToPassword(sentenceTag.value)
    //complexConvert(sentenceTag.value)
    let keyTag = document.createElement('p')
    let pTag = document.createElement('p')
    keyTag.textContent = 'Key: '+password[1]
    pTag.textContent = 'Password: '+password[0]
    document.querySelector('#result').appendChild(pTag)
    document.querySelector('#result').appendChild(keyTag)
})

/**
 * When decrypt button is pressed
 */
decryptBtn.addEventListener('click', function(e){
    e.preventDefault()
    let sentence = document.querySelector('#dSentence')
    let key = document.querySelector('#key')
    const p = document.createElement('p')
    p.textContent = `Password: ${decrypt(sentence.value, key.value)}`
    document.querySelector('#decrypt-result').innerHTML = ''
    document.querySelector('#decrypt-result').appendChild(p)
})


/**
 * Takes a sentence and returns an alphabetic password
 * @param {*} sentence 
 */
const convertToPassword=(sentence)=>{
    let GeneratedPw = ""
    let key =''
    
    let splitSentence = sentence.split(" ")
    
    splitSentence.forEach(function(item, index){
        let rand = Math.floor((Math.random() * item.length))
        GeneratedPw += item[rand]
        // console.log('Picked character '+pChar)
        // console.log('Index generated '+rand)
        rand++
        key += rand.toString();
        
    })
    return [GeneratedPw, key]
}

/**
 * Takes a sentence and converts it into an alphanumeric password
 * @param {} sentence 
 */
const complexConvert=(sentence)=>{
    let GeneratedPw = ""
    let key =''
    let splitSentence = sentence.split(" ")
    
    splitSentence.forEach(function(item, index){
        let rand = Math.floor((Math.random() * item.length))
        let toNum = Math.round((Math.random() * 1))
        if(toNum === 1){
            // Swap character with random number between 0 and 9
            const keyIndex = Math.floor((Math.random() * 10))   // index for numKey
            const charInd = numKey[keyIndex]                    // index for charKey
            key += charKey[charInd]                             // Adds key
            GeneratedPw += passSus[charInd]                     // Adds special character
        } else {
            GeneratedPw += item[rand]
            rand++; // To print human understandable character position
            key += rand.toString();
        }
        
        
    })

    return [GeneratedPw, key]
}

/**
 * Takes a sentence and converts it into an alphanumeric password
 * @param {} sentence 
 */
// const complexConvert=(sentence)=>{
//     let GeneratedPw = ""
//     let numToAdd = 0;
//     let key =''
//     let splitSentence = sentence.split(" ")
    
//     splitSentence.forEach(function(item, index){
//         let rand = Math.floor((Math.random() * item.length))
//         let toNum = Math.round((Math.random() * 1))
//         //let key = Math.floor((Math.random() * 10))
//         // Swap character with random number between 0 and 9
//         if(toNum === 1){
            
//             let a = item[rand]
//             let randNum = Math.floor((Math.random() * 10))
//             //item[rand] = randNum.toString();
//             GeneratedPw += numToAdd.toString()
//             numToAdd++
//             if(numToAdd > 9){
//                 numToAdd = 0
//             }
//             key += item[rand];
//         } else {
//             GeneratedPw += item[rand]
//             rand++; // To print human understandable character position
//             key += rand.toString();
//         }
        
        
//     })

//     return [GeneratedPw, key]
// }

/**
 * Returns decrypted password. Takes in key & sentence
 * @param {String} sentence 
 * @param {String} key 
 */
// const decrypt =(sentence, key)=>{
//     let password = ''
//     let splitSentence = sentence.split(" ")
//     let numChar = 0;
//     splitSentence.forEach(function(word, index){
//         let num = key[index]
//         let n = parseInt(num)
//         if(Number.isInteger(n)){
//             password += word[n-1]
//         }else {
//             password += numChar;
//             numChar++;
//         }
//     })
//     return password
// }

/**
 * Returns decrypted password. Takes in key & sentence
 * @param {String} sentence 
 * @param {String} key 
 */
const decrypt =(sentence, key)=>{
    let password = ''
    let splitSentence = sentence.split(" ")
    
    splitSentence.forEach(function(word, index){
        let chi = key[index]
        let n = parseInt(chi)
        if(Number.isInteger(n)){
            // Add char to p
            password += word[n-1]
        }else {
            const i = charKey.findIndex(function(e){
                return e === chi
            })
            password += passSus[i]
        }
    })
    return password
}