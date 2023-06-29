// import FuzzySearch from 'fuzzy-search';

let allStars = [
    "LeBron James",
    "Stephen Curry",
    "Kawhi Leonard",
    "Paul George",
    "Luka Dončić",
    "Anthony Davis",
    "Nikola Jokic",
    "Donovan Mitchell",
    "Damian Lillard",
    "Rudy Gobert",
    "Zion Williamson",
    "DeMar DeRozan",
    "Giannis Antetokounmpo",
    "Kevin Durant",
    "Kyrie Irving",
    "Joel Embiid",
    "James Harden",
    "Bradley Beal",
    "Jaylen Brown",
    "Ben Simmons",
    "Kris Middleton",
    "Bam Adebayo",
    "Jayson Tatum",
    "Nikola Vucevic",
    "Julius Randle",
    "Domatas Sabonis",
];

let firstHalf = [
    "ATL",
    "BOS",
    "FLA",
    "LON",
    "LAG",
    "LAT"
];

let secondHalf = [
    "MIN",
    "NYS",
    "OPT",
    "SEA",
    "TOR",
    "VEG"
];


Array.prototype.getUnique = function() {
    var o = {},
        a = [],
        i,
        e;
    for (i = 0;
        (e = this[i]); i++) {
        o[e] = 1;
    }
    for (e in o) {
        a.push(e);
    }
    return a;
};

function imgStrip(fullStr) {
    return fullStr.substring(25, fullStr.length - 4)
}

function names_only(player_d) {
    let res = {};
    for (let i = 0; i < player_d.children.length; i++) {
        let currTeam = player_d.children[i];
        if (currTeam.children) {
            for (let j = 0; j < currTeam.children.length; j++) {
                res[currTeam.children[j].name] = imgStrip(currTeam.children[j].img);
            }
        } else {
            for (let k = 0; k < currTeam._children.length; k++) {
                res[currTeam.children[k].name] = imgStrip(currTeam.children[k].img);
            }
        }
    }
    return res;
}

function searchFunction() {
    let results = [];
    let input = document.getElementById("myInput");
    let filter = input.value.toUpperCase();
    if (filter.length >= 3) {
        for (var i in player_array) {
            let name = i;
            let upperName = name.toUpperCase();
            if (upperName.includes(filter)) {
                results.push(name);
            }
        }
    }
    console.log(player_array[results[0]]);

    if (results.length == 1) {
        document.getElementById('positioner-all-star-left-search').style.display = 'block';
        document.getElementById('all-star-wrapper-left-search').style.display = 'block';
        document.getElementById('profile-all-star-search').style.display = 'block';
        document.getElementById('cover-img-search').style.display = 'block';
        document.getElementById('positioner-all-star-left-search').style.visibility = 'visible';
        document.getElementById('all-star-wrapper-left-search').style.visibility = 'visible';
        document.getElementById('profile-all-star-search').style.visibility = 'visible';
        document.getElementById('cover-img-search').style.visibility = 'visible';
        document.getElementById('cover-img-search').src = player_array[results[0]];
    } else {
        document.getElementById('positioner-all-star-left-search').style.display = 'none';
        document.getElementById('all-star-wrapper-left-search').style.display = 'none';
        document.getElementById('profile-all-star-search').style.display = 'none';
        document.getElementById('cover-img-search').style.display = 'none';
        document.getElementById('positioner-all-star-left-search').style.visibility = 'hidden';
        document.getElementById('all-star-wrapper-left-search').style.visibility = 'hidden';
        document.getElementById('profile-all-star-search').style.visibility = 'hidden';
        document.getElementById('cover-img-search').style.visibility = 'hidden';
    }

}

let currFGper, curr3Pper, currFTper;

let player_data;
let player_array;
let num_char_code;

// fetch("data/nba.json")
fetch("data/statistics.json")
    .then((res) => res.json())
    .then((json) => {
        let diameter = window.innerWidth;
        let width = 946;
        let heightRatio = 946 / window.innerHeight;
        let height = window.innerHeight * heightRatio;
        console.log(window.innerHeight, window.innerWidth);
        if (window.innerHeight >= 946) {
            console.log("checking");
            height = window.innerHeight;
        }
        console.log(height, width);

        let i = 0,
            duration = 300,
            root;

        let twentyNineTeen = json;
        player_data = json;
        player_array = names_only(player_data);

        function click(d) {
            height = window.innerHeight * 2;
            counter.getUnique();

            if (d.children) {
                if (d.name.length < 4 && d.name !== "NBA") {
                    counter = removeFromCounter(d, counter);
                    d._children = d.children;
                    d.children = null;
                }
            } else {
                if (d.name.length < 4 && d.name !== "NBA") {
                    counter.push(d);
                    d.children = d._children;
                    d._children = null;
                    if (counter.length > 6) {
                        collapse(counter.shift());
                    }
                }
            }
            if (d.name.length <= 3) {
                update(d);
            }
            update(d);
        }

        //DISTANCE BETWEN CLUSTERS
        let tree = d3.layout
            .tree()
            .size([360, diameter / 2 - 80])
            .separation(function(a, b) {
                return (a.parent === b.parent ? 1.5 : 2.7) / a.depth;
            });

        let diagonal = d3.svg.diagonal.radial().projection(function(d) {
            return [d.y, (d.x / 180) * Math.PI];
        });

        let svg = d3
            .select("body")
            .append("svg")
            .attr("class", "radial-tree")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        // .on('mouseover', function(d, i){
        //     tip.show(d,i);
        // });
        root = twentyNineTeen;
        root.x0 = 0;
        root.y0 = 0;

        var tip = d3.tip().attr("class", "d3-tip");
        tip
            .offset(function(d) {
                //   console.log('x', d.x);
                //   console.log('y', d.y);
                //   return [0,0]
                return [-d.x, -d.x];
            })
            .html(function tipper(d) {
                if (d.name.length > 3) {
                    if (firstHalf.includes(d.Tm)) {
                        return (
                            "<div id='positioner-all-star-left'><div id=all-star-wrapper-left><div id='profile-all-star'>" +
                            d.img +
                            "</div>" +
                            "</div>" +
                            "</div>"
                        );
                    } else {
                        return (
                            "<div id='positioner-all-star-right'><div id=all-star-wrapper-right><div id='profile-all-star'>" +
                            d.img +
                            "</div>"
                        );
                    }
                }
            });

        svg.call(tip);

        root.children.forEach(collapse); // start with all children collapsed
        update(root);

        d3.select(self.frameElement).style("height", "800px");

        function update(source) {
            // Compute the new tree layout.
            let nodes = tree.nodes(root),
                links = tree.links(nodes);
            let initial = new Set();
            let maxQueue = [];

            nodes.forEach(function(d) {
                if (d.name.length <= 3 && d.name !== "NBA") {
                    initial.add(d);
                }
                if (d.name === "NBA") {
                    d.y = d.depth * 1;
                } else if (d.parent.name === "NBA") {
                    d.y = d.depth * 175;
                } else {
                    d.y = d.depth * 125;
                }
            });

            // Update the nodes…
            let node = svg
                .selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                })
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide);

            function handleMouseOver(d, i) {
                // Add interactivity
                // console.log(d)
            }

            function handleMouseOut(d, i) {
                // Use D3 to select element, change color back to normal
                d3.select(this).attr({
                    fill: "black",
                    // r: 20
                });

                // Select text by id and then remove
                // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
            }

            // Enter any new nodes at the parent's previous position.
            let nodeEnter = node
                .enter()
                .append("g")
                .attr("class", "node")
                //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
                .on("click", click);

            nodeEnter.append("circle").on("mouseover", function(d) {
                console.log("WHAT");
            });

            nodeEnter
                .append("text")
                .attr("x", 30)
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .attr("transform", function(d) {
                    return d.x < 180 ?
                        "translate(0)" :
                        "rotate(180)translate(-" + d.name.length * 8.5 + ")";
                })
                .text(function(d) {
                    if (d.depth === 2) {
                        let allstarName = "✭" + d.name + "✭";
                        return allStars.includes(d.name) ? allstarName : d.name;
                    }
                })
                .attr("class", function(d) {
                    if (allStars.includes(d.name)) {
                        return "all-star";
                    } else {
                        return "non-all-star";
                    }
                })
                .style("fill-opacity", 1e-6);

            var imgs = svg.selectAll("image").data([0]);
            imgs.enter().append("svg:image");

            //Image Attributes
            nodeEnter
                .append("svg:image")
                .attr("x", function(d) {
                    if (d.name === "NBA") {
                        return -50;
                    } else {
                        return -25;
                    }
                })
                .attr("y", function(d) {
                    if (d.name === "NBA") {
                        return -50;
                    } else {
                        return -25;
                    }
                })
                .attr("width", function(d) {
                    if (d.name === "NBA") {
                        return 100;
                    } else {
                        return 50;
                    }
                })
                .attr("height", function(d) {
                    if (d.name === "NBA") {
                        return 100;
                    } else {
                        return 50;
                    }
                })
                .attr("transform", function(d) {
                    let nameArray = [
                        "ATL",
                        "BOS",
                        "BKN",
                        "CHA",
                        "CHI",
                        "CLE",
                        "DAL",
                        "DEN",
                        "DET",
                        "GSW",
                        "HOU",
                        "IND",
                        "LAC",
                        "LAL",
                        "MEM",
                        "MIA",
                        "MIL",
                        "MIN",
                        "NO",
                        "NYK",
                        "OKC",
                        "ORL",
                        "PHI",
                        "PHX",
                        "POR",
                        "SAC",
                        "SAS",
                        "TOR",
                        "UTH",
                        "WAS",
                    ];
                    if (d.name === "NBA") {
                        return "rotate(-90 0 0)";
                    }
                    const isTeamName = (str) => str.length <= 3;

                    if (isTeamName(d.name)) {
                        let convertedRotation = 83 - nameArray.indexOf(d.name) * 12;
                        return `rotate(${convertedRotation} 0 0)`;
                    }
                })
                .attr("xlink:href", function(d) {
                    if (d.name === "NBA") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt10f0d59f97d93946/5d8940702f5989598fc7de16/CDL_Logo.svg?auto=webp";
                    } else if (d.name === "ATL") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt76016b6762bd1cb8/5de850e4174b0d0c519bc9fb/ATL-FAZ_Alternate-Logo-2.svg?auto=webp";
                    } else if (d.name === "BOS") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt69dd80f51295ea0a/61e09af0a408793a37adc7a4/cdl-boston-breach-icon-color-dark-padding.svg?auto=webp";
                    } else if (d.name === "FLA") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/bltcb76ee572edb9eb1/5db6f301afa1e66c2c3e67c8/FLA_-_Mutineers.svg?auto=webp";
                    } else if (d.name === "LON") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt5edc59dbbfc88667/5da5fabf3412200466759b94/LON_Alternate-Logo.svg?auto=webp";
                    } else if (d.name === "LAG") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/bltf8a143b45301c312/5dc48b33f4eb996c3143cd7b/LOS_-_Guerrillas.svg?auto=webp";
                    } else if (d.name === "LAT") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt4ae7c1816b4ffc52/5fa5a10ea9e913483b74d191/cdl_la_thieves_primary_logo_padding.svg?auto=webp";
                    } else if (d.name === "MIN") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt68f6338af72925ae/5dcdced9f9bc5549969944c3/MIN_-_ROKKR.svg?auto=webp";
                    } else if (d.name === "NYS") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/bltd2e46fa664846bb7/636bedd09dfd7536c20279f5/nysl_logo_primary_padding.svg?auto=webp";
                    } else if (d.name === "OPT") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt4bee833057845797/618af2431bb8c23cf8bbede5/cdl_optic_texas_icon_light.svg?auto=webp";
                    } else if (d.name === "SEA") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/bltbe8507a1cef478bb/5dba15def9bc554996993cd0/SEA_-_Surge.svg?auto=webp";
                    } else if (d.name === "TOR") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt03a7b353cf75f8cf/5dc48a76f4eb996c3143cd75/Group_4.svg?auto=webp";
                    } else if (d.name === "VEG") {
                        return "https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt7c039a2766790e32/5dbdac971af57b7f5dfa2df1/PAR_-_Legion.svg?auto=webp";
                    }
                });

            // Transition nodes to their new position.
            let nodeUpdate = node
                .transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
                });

            //size of node circle
            nodeUpdate
                .select("circle")
                .attr("r", function(d) {
                    if (d.depth === 1) {
                        return 25;
                    } else if (d.depth === 0) {
                        return 50;
                    } else {
                        return 2.5;
                    }
                })
                .style("fill", function(d) {
                    return d._children ?
                        "rgba(167, 167, 167, 0.294)" :
                        "rgba(67, 57, 167, 0.694)";
                });
            //  .on("mouseover", function (d) {
            //    var g = d3.select(this); // The node
            //    g.attr('r', 40);
            // })

            nodeUpdate
                .select("text")
                .style("fill-opacity", 1)
                //FLIP WHEN HALF WAY
                .attr("transform", function(d) {
                    return d.x < 180 ?
                        "translate(0)" :
                        "rotate(180)translate(-" + (d.name.length + 158) + ")";
                });

            // TODO: appropriate transform
            let nodeExit = node
                .exit()
                .transition()
                .duration(duration)
                //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle").attr("r", 1e-6);

            nodeExit.select("text").style("fill-opacity", 1e-6);

            // Update the links…
            let link = svg.selectAll("path.link").data(links, function(d) {
                return d.target.id;
            });

            // Enter any new links at the parent's previous position.
            link
                .enter()
                .insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    let o = { x: source.x0, y: source.y0 };
                    return diagonal({ source: o, target: o });
                });

            // Transition links to their new position.
            link.transition().duration(duration).attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link
                .exit()
                .transition()
                .duration(duration)
                .attr("d", function(d) {
                    let o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        function removeFromCounter(node, queue) {
            let newQueue = [];
            queue.forEach((x) => {
                if (x.name !== node.name) {
                    newQueue.push(x);
                }
            });

            return newQueue;
        }

        let counter = [];

        function click(d) {
            height = window.innerHeight * 2;
            counter.getUnique();

            if (d.children) {
                if (d.name.length < 4 && d.name !== "NBA") {
                    counter = removeFromCounter(d, counter);
                    d._children = d.children;
                    d.children = null;
                }
            } else {
                if (d.name.length < 4 && d.name !== "NBA") {
                    counter.push(d);
                    d.children = d._children;
                    d._children = null;
                    if (counter.length > 6) {
                        collapse(counter.shift());
                    }
                }
            }
            if (d.name.length <= 3) {
                update(d);
            }
            update(d);
        }

        // Collapse nodes
        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }
    });