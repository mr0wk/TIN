const morseCipherMapping = {
    "a" : ".-", "b" : "-...","c" : "-.-.", "d" : "-..",
    "e" : ".", "f" : "..-.", "g" : "--.", "h" : "....",
    "i" : "..", "j" : ".---", "k" : "-.-", "l" : ".-..",
    "m" : "--", "n" : "-.", "o" : "---", "p" : ".--.",
    "q" : "--.-", "r" : ".-.", "s" : "...", "t" : "-",
    "u" : "..-", "v" : "...-", "w" : ".--", "x" : "-..-",
    "y" : "-.--", "z" : "--..", "0" : "-----", "1" : ".----", 
    "2" : "..---", "3" : "...--", "4" : "....-", "5" : ".....", 
    "6" : "-....", "7" : "--...", "8" : "---..", "9" : "----."
}

const affineCipherMappingEncode = {
    "a" : "0", "b" : 1, "c" : 2, "d" : 3,
    "e" : 4, "f" : 5, "g" : 6, "h" : 7,
    "i" : 8, "j" : 9, "k" : 10, "l" : 11,
    "m" : 12, "n" : 13, "o" : 14, "p" : 15,
    "q" : 16, "r" : 17, "s" : 18, "t" : 19,
    "u" : 20, "v" : 21, "w" : 22, "x" : 23,
    "y" : 24, "z" : 25
}

const affineCipherMappingDecode = {
    "a" : "0", "b" : 1, "c" : 2, "d" : 3,
    "e" : 4, "f" : 5, "g" : 6, "h" : 7,
    "i" : 8, "j" : 9, "k" : 10, "l" : 11,
    "m" : 12, "n" : 13, "o" : 14, "p" : 15,
    "q" : 16, "r" : 17, "s" : 18, "t" : 19,
    "u" : 20, "v" : 21, "w" : 22, "x" : 23,
    "y" : 24, "z" : 25
}

const vigenereCipherMapping = "abcdefghijklmnopqrstuvwxyz".split("");


function textToMorse() {
    var input = document.getElementById("input").value;
    input = input.toLowerCase().split("");
    
    var output = input.map(char => {
		if (morseCipherMapping[char]) {
			return morseCipherMapping[char];
		} else {						
			return char;
		}
	}).join(" ");

    document.getElementById("output").value = output;
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


function morseToText() {
    var input = document.getElementById("input").value;
    input = input.split(" ");

    var output = input.map(char => {
		if (getKeyByValue(morseCipherMapping, char)) {
			return getKeyByValue(morseCipherMapping, char);
		} else if (char == "") {
			return " ";
		} else {
			return char;
		}
	}).join("").replace(/\s\s+/g, ' ');

    document.getElementById("output").value = output;

}


function countGreatestCommonDivisor(a, b) {
    if (a == 0 || b == 0) {
        return 0;
    }

    if (a == b) {
        return a;
    }

    if (a > b) {
        return countGreatestCommonDivisor(a - b, b);
    }

    return countGreatestCommonDivisor(a, b - a);
}


function numbersAreCoprime(a, b) {
    if (countGreatestCommonDivisor(a, b) == 1) {
        return true;
    } else {
        return false;
    }
}


function textToAffine() {
    var m = 26;
    var a = Number(document.getElementById("a").value);
    var b = Number(document.getElementById("b").value);

    if (numbersAreCoprime(a, b)) {
        var input = document.getElementById("input").value;
        input = input.toLowerCase().split("");

        var output = input.map(char => {
            if (affineCipherMappingEncode[char]) {
                if (affineCipherMappingEncode[char] == "0") {
                    return getKeyByValue(affineCipherMappingEncode, (a * Number(affineCipherMappingEncode[char]) + b) % m);
                }

                return getKeyByValue(affineCipherMappingEncode, (a * Number(affineCipherMappingEncode[char]) + b) % m);
            } else if (char == "") {
                return " ";
            } else {
                return char;
            }
        }).join("").replace(/\s\s+/g, ' ');
        
        document.getElementById("output").value = output;
    } else {
        alert("Numbers which are part of the ciphering key are not coprime or are empty!")
    }
}


function modularInverse(a, m) {
    for (let i = 0; i <= m - 1; i++) {
        if (a * i % m == 1) {
            return i;
        } else {
            continue;
        }
    }
}


function mod(num, mod) {
    return (num % mod + mod) % mod;
}


function affineToText(a, b) {
    var m = 26;
    var a = Number(a);
    var b = Number(b);

    if (numbersAreCoprime(a, b)) {
        var input = document.getElementById("input").value;
        input = input.toLowerCase().split("");
        console.log(input);

        var output = input.map(char => {
            if (affineCipherMappingDecode[char]) {
                if (affineCipherMappingDecode[char] == "0") {
                    return getKeyByValue(affineCipherMappingDecode, mod(modularInverse(a, m) * (Number(affineCipherMappingDecode[char]) - b), m));
                }

                var decipheredCharIndex = mod(modularInverse(a, m) * (affineCipherMappingDecode[char] - b), m);

                if (decipheredCharIndex == 0) {
                    return getKeyByValue(affineCipherMappingDecode, "0");
                }

                return getKeyByValue(affineCipherMappingDecode, mod(modularInverse(a, m) * (affineCipherMappingDecode[char] - b), m));
            } else if (char == "") {
                return " ";
            } else {
                return char;
            }
        }).join("").replace(/\s\s+/g, ' ');
        
        document.getElementById("output").value = output;

        return output;
    } else {
        alert("Numbers which are part of the ciphering key are not coprime or are empty!")
    }
}


function textToVigenere() {
    var key = document.getElementById("key").value.toLowerCase().split("");
    var keyMultiple = [];
    var input = document.getElementById("input").value;
    input = input.toLowerCase().split("");
    var output = "";
    
    for (let i = 0; i <= input.length - 1; i++) {
        if (i < key.length) {
            keyMultiple.push(key[i]);
        } else {
            keyMultiple.push(key[i - (Math.floor(i / key.length)) * key.length]);
        }
    }

    for (let i = 0; i <= input.length - 1; i++) {
        var inputChar = input[i];
        var keyMultipleChar = keyMultiple[i];
        var cipheredCharIndex = vigenereCipherMapping.indexOf(inputChar) + vigenereCipherMapping.indexOf(keyMultipleChar);
        if (cipheredCharIndex <= 25) {
            output += vigenereCipherMapping[cipheredCharIndex];
        } else {
            output += vigenereCipherMapping[cipheredCharIndex - 26];
        }
    }

    document.getElementById("output").value = output;
}


function vigenereToText() {
    var key = document.getElementById("key").value.toLowerCase().split("");
    var keyMultiple = [];
    var input = document.getElementById("input").value;
    input = input.toLowerCase().split("");
    var output = "";

    for (let i = 0; i <= input.length - 1; i++) {
        if (i < key.length) {
            keyMultiple.push(key[i]);
        } else {
            keyMultiple.push(key[i - (Math.floor(i / key.length)) * key.length]);
        }
    }
    
    for (let i = 0; i <= input.length - 1; i++) {
        var inputChar = input[i];
        var keyMultipleChar = keyMultiple[i];
        var uncipheredCharIndex =  vigenereCipherMapping.indexOf(keyMultipleChar) - vigenereCipherMapping.indexOf(inputChar);

        if (uncipheredCharIndex > 0 ) {
            output += vigenereCipherMapping[Math.abs(uncipheredCharIndex - 26)]; 
        } else {
            output += vigenereCipherMapping[Math.abs(uncipheredCharIndex)]; 
        }
        
    }

    document.getElementById("output").value = output;
}


function cipherAction() {
    var action = document.getElementById("action").value;
    var cipher = document.getElementById("cipher").value;

    document.getElementById("output").value = "";
    if (cipher == "morse") {
        if (action == "encode") {
            textToMorse();
        } else if (action == "decode") {
            morseToText();
        }
    } else if (cipher == "affine") {
        if (action == "encode") {
            textToAffine();
        } else if (action == "decode") {
            affineToText(document.getElementById("a").value, document.getElementById("b").value);
        }
    } else if (cipher == "vigenere") {
        if (action == "encode") {
            textToVigenere();
        } else if (action == "decode") {
            vigenereToText();
        }
    }
}

function downloadOutputAsTxtFile(output, fileName)
{
    var outputAsBlob = new Blob([output], {type:'text/plain'}); 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.innerHTML = "Download";
    if (window.webkitURL != null)
    {
        downloadLink.href = window.webkitURL.createObjectURL(outputAsBlob);
    }
    else
    {
        downloadLink.href = window.URL.createObjectURL(outputAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}


$(function() {
    $("#cipher").change(function(event) {
        var option = this.options[ this.selectedIndex ];
        
        if ($(option).val() == "morse") {
            $(".affine-key-el").hide();
            $(".vigenere-key-el").hide();
        } else if ($(option).val() == "affine") {
            $(".affine-key-el").show();
            $(".vigenere-key-el").hide();
        } else if ($(option).val() == "vigenere") {
            $(".vigenere-key-el").show();
            $(".affine-key-el").hide();
        }
    });
});

$(function() {
    $("#load").click(function(event) {
                let load = document.getElementById("load")
 
        let input = document.getElementById("input")

        load.addEventListener("change", () => {
            let files = load.files;

            if (files.length == 0) return;

            const file = files[0];
        
            let reader = new FileReader();
        
            reader.onload = (e) => {
                const file = e.target.result;
        
                const lines = file.split(/\r\n|\n/);
                input.value = lines.join('\n');
        
            };
        
            reader.onerror = (e) => alert(e.target.error.name);
        
            reader.readAsText(file);


        });
    });
});
