//3-D contour Graphs draw function
function d3con(bolckid, drugrow, drugcol) {
    $.ajax({
        type: "GET",
        url: "lastupdate/graph3d_test.php",
        data: {
            block_id: bolckid
        },
        dataType: 'json',
        success: function(response) {
			var dtickcolor = 0;
            var colorval = [];
            var dic = {
                conr: [],
                conrne: [],
                concnew: [],
                resnew: [],
                szipnew: [],
                sblissnew: [],
                shsanew: [],
                slonew: [],
                conc: [],
                res: [],
                synergy_zip: [],
                synergy_bliss: [],
                synergy_hsa: [],
                synergy_loewe: []
            };

            $.each(response[0], function(key) {
                dic.conr.push(parseFloat(response[0][key][0]));
                dic.conc.push(parseFloat(response[0][key][1]));
                dic.res.push(parseFloat(response[0][key][2]));
                dic.synergy_zip.push(parseFloat(response[0][key][3]));
                dic.synergy_bliss.push(parseFloat(response[0][key][4]));
                dic.synergy_hsa.push(parseFloat(response[0][key][5]));
                dic.synergy_loewe.push(parseFloat(response[0][key][6]));
            });


            $.each(response[1], function(key) {
                dic.conrne.push(parseFloat(response[1][key][0]));
                dic.concnew.push(parseFloat(response[1][key][1]));
                dic.resnew.push(parseFloat(response[1][key][2]));
                dic.szipnew.push(parseFloat(response[1][key][3]));
                dic.sblissnew.push(parseFloat(response[1][key][4]));
                dic.shsanew.push(parseFloat(response[1][key][5]));
                dic.slonew.push(parseFloat(response[1][key][6]));
            });


            /* 
			Main Function to draw 3D graphs:
			Parameters are:
			               name: is the name of 3D graph3d
						   zdata: z axis data [smoothed data]
						   elementid: is the name of HTML component that 3D graph will be drawn in it
						   orz: is the raw data without any smoothing
			*/
            function plot3d(name, zdata, elementid, orz) {
                var zminv = 0;
                var zmaxv = 100;
                var start = 0;
                var end = 0;
                var size = 0;
                var bshow = true;
                if (name != 'RESPONSE') {
                    zminv = -30;
                    zmaxv = 30;
                    colorval = [-30, 0, 30];
                    dtickcolor = 30;
                    start = -30;
                    end = 30;
                    size = 30;
                } else {
                    colorval = [0, 50, 100];
                    dtickcolor = 50;
                    start = 0;
                    end = 100;
                    size = 50;
					name = '% INHIBITION';
                }

                /*
	             var rt=conr.map(x => "DrugA conc:"+x);
	             var textc = conr.map(function(e, i) {
                                      return ["DrugA conc:"+e, "DrugB conc:"+conc[i],"Response:"+zdata[i]];
                                      });
                */
				

                /*
                This is the hover text style. Hover text on any point show three pieces of information: DrugA, DrugB, Synergy value
                Mapping the data done by using the functional language style using map function.
                */
                var texter = zdata.map((row, i) => {
                    return `DrugA conc: ${Math.round(dic.conr[i] * 100) / 100}<br> DrugB conc: ${Math.round(dic.conc[i] * 100) / 100}<br> ${name}: ${row}`
                });


                var data = {
                    z: zdata,
                    x: dic.conr,
                    y: dic.conc,
                    text: texter, //hover_text
                    hoverinfo: 'text',
                    connectgaps: true,
                    type: 'contour',
                    zsmooth: 'best',
                    colorscale: [
                        ['0.0', 'rgb(158, 250, 191	)'],
                        ['0.555555555556', 'rgb(255, 255, 255)'],
                        ['1.0', 'rgb(244, 109, 67)']
                    ],


                    colorbar: {
                        //ticks: 'outside',
                        //dtick: 10,
                        //tickwidth: 2,
                        //ticklen: 10,
                        //tickcolor: 'grey',
                        //showticklabels: true,
                        //tickvals:[Math.min(...zdata),Math.max(...zdata)],
                        //tickmode: 'array',
                        //nticks:3,
                        dtick: dtickcolor,
                        //ticklen:dtickcolor,
                        tickvals: colorval,
                        tickfont: {
                            size: 15
                        },
                        xpad: 50
                    },
                    autocontour: false,
                    contours: {
                        start: start,
                        end: end,
                        // size: size,
                        //coloring: 'heatmap'

                    },

                    // showscale:bshow,
                    line: {
                        smoothing: 0.85
                    },

                    xaxis: 'x1',
                    yaxis: 'y1'
                };

                var layout = {};
                if (name == '% INHIBITION') {
                    layout = {
                        //  dragmode: "pan",
                        width: ((($(document).width()) - 400) / 2),
                        height: 500,
                        font: {
                            color: "black",
                            size: 11
                        },
                        xaxis: {
                            //	title:drugrow+' (nM)',tickvals: conrne,    tickwidth: 4,    exponentformat: 'e',
                            tickmode: 'match overlay',
                            tickwidth: 4,
                            tick0: 0,
                            gridwidth: 2,
                            type: 'category',
                            title: drugrow + ' (uM)',
                            tickvals: dic.conrne.filter((v, i, a) => a.indexOf(v) === i), //.map(x => x*1000),
                            showticklabels: true,
                            tickangle: 45,
                        },
                        yaxis: {
                            title: drugcol + ' (uM)',
                            tickvals: dic.concnew.filter((v, i, a) => a.indexOf(v) === i),
                            showticklabels: true,
                            tickangle: 45,
                            tickmode: 'match overlay',
                            tickwidth: 4,
                            tick0: 0,
                            gridwidth: 2,
                            type: 'category',
                        },
                        //margin: { l: 50, b: 50, r: 50, t: 60 }  ,
                        margin: {
                            t: 5
                        },
                        displayModeBar: true
                    };
                } else {


                    layout = {
                        //dragmode: "pan",
                        width: ((($(document).width()) - 400) / 2),
                        height: 500,
                        font: {
                            color: "black",
                            size: 11
                        },
                        xaxis: {
                            //	title:drugrow+' (nM)',tickvals: conrne,    tickwidth: 4,    exponentformat: 'e',
                            // showexponent: 'all'
                            title: drugrow + ' (uM)',
                            tickvals: dic.conrne.filter((v, i, a) => a.indexOf(v) === i), //.map(x => x*1000),
                            showticklabels: true,
                            tickangle: 45,
                            tickmode: 'match overlay',
                            tickwidth: 4,
                            tick0: 0,
                            gridwidth: 2,
                            type: 'category'
                        },
                        yaxis: {
                            title: drugcol + ' (uM)',
                            tickvals: dic.concnew.filter((v, i, a) => a.indexOf(v) === i),
                            showticklabels: true,
                            tickangle: 45,
                            tickmode: 'match overlay',
                            tickwidth: 4,
                            tick0: 0,
                            gridwidth: 2,
                            type: 'category'
                        },
                        //margin: { l: 50, b: 50, r: 50, t: 60 }  ,
                        margin: {
                            t: 5
                        },
                        displayModeBar: true
                    };
                }


                //just add d to all data like var alldata=[data,d];

                //This is the points drawn on top of contour plot
                var result = orz.map(String);
                var d = {
                    x: dic.conrne,
                    y: dic.concnew,
                    mode: 'markers+text',
                    textposition: 'top',
                    type: 'scatter',
                    text: result,
                    // name: name,
                    marker: {
                        size: 3
                    },
                    hoverinfo: 'none'
                };

                document.getElementById(elementid + '_1').style.display = "none";
                document.getElementById(elementid).style.display = "block";

                var alldata = [data, d];

                Plotly.newPlot(elementid, alldata, layout, {
                    modeBarButtonsToRemove: ['toImage', 'sendDataToCloud', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d',
                        'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom3d', 'pan3d', 'orbitRotation',
                        'tableRotation', 'resetCameraDefault3d', 'toggleHover', 'toggleSpikelines'
                    ],
                    modeBarButtonsToAdd: [{
                        name: 'Dowload as svg',
                        icon: Plotly.Icons.camera,
                        click: function(gd) {
                            Plotly.downloadImage(gd, {
                                format: 'svg'
                            })
                        }
                    }]
                }, {
                    responsive: true
                });


                /*
	            console.log(name);
	            console.log(Math.max(...zdata));

	            var data = [{
                             type:"heatmap",
                             x:conr,
                             y:conc,
                             z:zdata,
                             intensity:[0, 0.33, 0.66, 1],
                             colorscale: [
                                         [0,'rgb(0, 0, 255)' ],
                                         [0.5, 'rgb(0, 255, 0)'],
                                         [1, 'rgb(255, 0, 0)']
                                         ]
							}];
                
				var layout = {
	                         title : name,
		                     scene : {
		                              xaxis: {
			                                  title:drugrow,tickvals: conrne
                                        },
                                      yaxis: {
   	                                          title:drugcol,tickvals: concnew
                                        },
                                      zaxis:{
                                              title: name
                                        },
                                      dragmode: false
			                        }
	                        };
                            Plotly.newPlot(elementid, data, layout);
                */

            }

            //*****************************************************
            drawChart();

            function drawChart() {
                var i = 0;
                var names = ['RESPONSE', 'ZIP', 'BLISS', 'HSA', 'LOEWE'];
                var ids = ['graph3d', 'graph3d2', 'graph3d3', 'graph3d4', 'graph3d5'];
                var zdata = [dic.res, dic.synergy_zip, dic.synergy_bliss, dic.synergy_hsa, dic.synergy_loewe];
                var ozdata = [dic.resnew, dic.szipnew, dic.sblissnew, dic.shsanew, dic.slonew];
                for (i = 0; i < ids.length; i++) {
                    plot3d(names[i], zdata[i], ids[i], ozdata[i]);
                }
            }

            $(window).resize(function() {
                drawChart();
            });


        }

    });

}