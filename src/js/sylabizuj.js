const phones = [];

"au,eu,ia,ią,ie,ię,ii,io,ió,iu,iy,AU,EU,IA,IĄ,IE,IĘ,II,IO,IÓ,IU,IY,a,ą,e,ę,i,o,ó,u,y,A,Ą,E,Ę,I,O,Ó,U,Y"
  .split(",")
  .forEach((vovel) => {
    phones.push({ type: "vowel", data: vovel });
  });

"ch,cz,dz,dź,dż,rz,sz,CH,CZ,DZ,DŹ,DŻ,RZ,SZ,b,c,ć,d,f,g,h,j,k,l,ł,m,n,ń,p,q,r,s,ś,t,v,w,x,z,ź,ż,B,C,Ć,D,F,G,H,J,K,L,Ł,M,N,Ń,P,Q,R,S,Ś,T,V,W,X,Z,Ź,Ż"
  .split(",")
  .forEach((consonant) => {
    phones.push({ type: "consonant", data: consonant });
  });

/**
 * Function syllabifying Polish words.
 *
 * @param {String} word
 * @returns {Array}
 */
export function sylabizuj(word) {
  //
  // Extract phones
  //
  let wordPhones = [];
  let offset = 0;
  let unknownCharacter = false;
  while (offset < word.length) {
    unknownCharacter = true;

    for (let i = 0; i < phones.length; i++) {
      if (offset + phones[i].data.length <= word.length) {
        if (
          phones[i].data ===
          word.substring(offset, offset + phones[i].data.length)
        ) {
          wordPhones.push(phones[i]);
          offset += phones[i].data.length;
          unknownCharacter = false;
          break;
        }
      }
    }
    if (unknownCharacter) {
      wordPhones.push({ type: "consonant", data: word[offset] });
      offset += 1;
    }
  }
  //
  // Build basic syllabes
  //
  let syllables = [];
  let syllable = [];
  offset = 0;
  while (offset < wordPhones.length) {
    if (wordPhones[offset].type === "consonant") {
      syllable.push(wordPhones[offset]);
      offset += 1;
    } else {
      syllable.push(wordPhones[offset]);
      syllables.push(syllable);
      syllable = [];
      offset += 1;
    }
  }
  if (syllable.length > 0) {
    syllables.push(syllable);
  }
  //
  // Fix syllabes
  //
  if (syllables.length > 1) {
    //
    // Move first consonant to the previous syllabe if there is more than one consonant.
    //
    for (let i = 1; i < syllables.length; i++) {
      if (syllables[i].length > 2) {
        if (
          syllables[i][0].type === "consonant" &&
          syllables[i][1].type === "consonant"
        ) {
          syllables[i - 1].push(syllables[i].shift());
        }
      }
    }
    //
    // Merge the whole last syllable if it has no vowels.
    //
    let last = syllables.length - 1;
    let noVowels = syllables[last].every((value) => value.type === "consonant");
    if (noVowels) {
      syllables[last - 1] = syllables[last - 1].concat(syllables[last]);
      syllables.pop();
    }
  }
  //
  // Create final result array of strings.
  //
  let result = [];
  syllables.forEach((value) => {
    let resultSyllable = "";
    value.forEach((value2) => {
      resultSyllable += value2.data;
    });
    result.push(resultSyllable);
  });
  return result;
}
