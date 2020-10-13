let json = {
	"person": {
		"name": "Caroline",
        "age": 25,
        "favourites": {"food": "pasta", "workout": "running", "color": "green"}
	},
	"city": "Stockholm"
};

// Global variable for modified JSON object
let modified = {}


function modify(json, recursive) {
    // Temporary storage
    let temp = {}
    for(const key in json){
        // If we are at a nested JSON-object, we want to swap within the object and not the key
        if(typeof(json[key]) === "object") {
            // If we are in a recursive loop we want to append to the temporary storage, else the global
            if(recursive) {
                temp[key] =  modify(json[key], true);
            }
            else {
                modified[key] = modify(json[key], true);
            }    
        }
        // If we are at a regular key-value pair, flip them and reverse the new value
        else {
            if(recursive) {
                temp[json[key]] = key.split("").reverse().join("");
            }
            else {
                modified[json[key]] = key.split("").reverse().join("");
            }
        }
    }
    // Only the non-recursive loop returns the global object, otherwise we return the temporary local storage
    if(recursive) {
        return temp
    }
    else {
        return modified
    }
}


console.dir(modify(json, false))