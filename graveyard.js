// // function names_only(player_d) {
// //   let name_hash = {};
// //   let num_char_code = {};
// //   let a = 97;
// //   for (let i = 0; i < 26; i++) {
// //     name_hash[String.fromCharCode(a + i).toUpperCase()] = [];
// //     num_char_code[String.fromCharCode(a + i).toUpperCase()] = i;
// //   }
// //   num_char_code["."] = 26;
// //   num_char_code["'"] = 27;
// //   for (let key in name_hash) {
// //     for (let i = 0; i < 26; i++) {
// //       name_hash[key].push({ [String.fromCharCode(a + i).toUpperCase()]: [] });
// //     }
// //     name_hash[key].push({ ".": [] });
// //     name_hash[key].push({ "'": [] });
// //   }

// //   for (let i = 0; i < player_d.children.length; i++) {
// //     let currTeam = player_d.children[i];
// //     if (currTeam.children) {
// //       for (let j = 0; j < currTeam.children.length; j++) {
// //         let firstTwo = currTeam.children[j].name.substring(0, 2).toUpperCase();
// //         firstTwo = firstTwo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
// //         let firstLetter = firstTwo[0];
// //         let secondLetterIdx = num_char_code[firstTwo[1]];
// //         console.log(currTeam.children[j].name);
// //         if (name_hash[firstTwo[0]][num_char_code[firstTwo[1]]].length) {
// //           name_hash[firstLetter][secondLetterIdx].push(
// //             currTeam.children[j].name
// //           );
// //         } else {
// //           name_hash[firstTwo[0]][num_char_code[firstTwo[1]]] = [
// //             currTeam.children[j].name,
// //           ];
// //         }
// //       }
// //     } else {
// //       for (let k = 0; k < currTeam._children.length; k++) {
// //         let firstTwo = currTeam.children[k].name.substring(0, 2).toUpperCase();
// //         if (name_hash[firstTwo[0]][num_char_code[firstTwo[1]]]) {
// //           name_hash[firstTwo[0]][num_char_code[firstTwo[1]]].push(
// //             currTeam.children[k].name
// //           );
// //         } else {
// //           name_hash[firstTwo[0]][num_char_code[firstTwo[1]]] = [
// //             currTeam.children[k].name,
// //           ];
// //         }
// //       }
// //     }
// //   }
// //   console.log(name_hash);
// //   return name_hash;
// // }

// function searchFunction() {
//   // let num_char_code = {};
//   // let a = 97;
//   // for (let i = 0; i < 26; i++) {
//   //   num_char_code[String.fromCharCode(a + i).toUpperCase()] = i;
//   // }
//   // num_char_code["."] = 26;
//   // num_char_code["'"] = 27;
//   var input, filter;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   // let curr_search = [];
//   //While search query is less than 3 letters and has a non-unique result
//   if (filter.length >= 3) {
//     // curr_search = player_array[filter[0]][num_char_code[filter[1]]];
//       let filteredSearch = ["n","b","a"];
//       let currName = "";
//       while (filteredSearch.length > 1) {
//         filteredSearch = [];
//         curr_search.forEach((n) => {
//           currName = n.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//           currName = currName.toUpperCase();
//           if (currName.startsWith(filter)) {
//             filteredSearch.push(n);
//           }
//         });
//         console.log(filteredSearch)
//         if(filteredSearch.length == 1){
//           findQueryNode(filteredSearch[0]);
//         }
//         if(filteredSearch.length == 0){
//           console.log("sorry no results")
//         }
//       }
//     }
//   }

// // function findQueryNode(player_name){
// // console.log(player_name)
// // for (let i = 0; i < player_data.children.length; i++) {
// //   let currTeam = player_data.children[i];
// //   if (currTeam.children) {
// //     for (let j = 0; j < currTeam.children.length; j++) {
// //       if (currTeam.children[j].name.toUpperCase().includes(filter)) {
// //         curr_search.push(player_data.children[i].children[j]);
// //       }
// //     }
// //   } else {
// //     for (let k = 0; k < currTeam._children.length; k++) {
// //       if (currTeam._children[k].name.toUpperCase().includes(filter)) {
// //         curr_search.push(player_data.children[i]._children[k]);
// //       }
// //     }
// //   }
// // }
// // }