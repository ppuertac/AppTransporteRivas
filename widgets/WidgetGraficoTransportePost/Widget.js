///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define(['dojo/_base/declare', 'jimu/BaseWidget',"esri/layers/FeatureLayer","esri/layers/ArcGISDynamicMapServiceLayer", "esri/dijit/BasemapToggle","esri/dijit/Gauge","dojo/dom", "esri/tasks/QueryTask","esri/tasks/query","esri/dijit/Legend", "dojo/_base/lang"],
  function(declare, BaseWidget,FeatureLayer, DynamicLayer, Toogle, Gauge, dom, QueryTask, Query, Legend, lang) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-widgetGraficoTransporte1',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      postCreate: function() {
        console.log('postCreate');
      },

      startup: function() {

        var queryTask = new QueryTask('https://laptop-ibqrag16/server/rest/services/PortalesRivasVaciamadrid/MapServer/1')

        var consulta = new Query()
        console.log('cajaHTML',this.cajaGauge2.innerHTML)

        consulta.outFields = ["pobl_porta","objectid", "accesobus", "accesobici"]
        consulta.where = "1 = 1"

        consulta.returnGeometry = true

        var sumaPoblacion = 0

        var poblacionAccesoBus = 0
        var poblacionAccesoBici = 0

        queryTask.execute(consulta, lang.hitch(this,function(consultado){

          console.log(consultado)
            var entidades = consultado.features


            //Calculamos población total            

            for (let entidad of entidades){
                var poblacionPortal = entidad.attributes.pobl_porta
                sumaPoblacion += poblacionPortal
            }

            console.log(sumaPoblacion)

            var maxValue = sumaPoblacion
            console.log('SumaFuera',sumaPoblacion)
        
            //Calculamos poblacion interna

            for (let entidad of entidades){
              var acceso = entidad.attributes.accesobus
              var poblacionPortal = entidad.attributes.pobl_porta

              if(acceso == 1 || acceso == 2){                
                poblacionAccesoBus += poblacionPortal
              }
            }
            
        
            var gaugeParams = {
            "caption": "",
            "color": "#008000",
            // "dataField": "MAGNITUDE", 
            "dataFormat": "value",
            // "dataLabelField": "PLACE ",
            // "layer": capaEntidades,
            "maxDataValue": maxValue, 
            "noFeatureLabel": "No name",
            "noDataLabel": 60000,
            "title": "",
            "unitLabel": "",
            "value": poblacionAccesoBus
            }
        
            var miGauge = new Gauge(gaugeParams, this.cajaGauge2)
            // miGauge.set("value", 2)
        
        
            miGauge.startup()

            this.porcentajePoblacion2.innerHTML = "<b>" + "<u>" + ((poblacionAccesoBus / maxValue)*100).toFixed(2) + " %" + "</u>" + "</b>" + ' de población con acceso actualmente'


            //Ahora repetimos el proceso con las bicicletas

            for (let entidad of entidades){
              var acceso = entidad.attributes.accesobici
              var poblacionPortal = entidad.attributes.pobl_porta

              if(acceso == 1 || acceso == 2){                
                poblacionAccesoBici += poblacionPortal
              }
            }
            console.log('accesoBiciPost', poblacionAccesoBici)
            
        
            var gaugeParamsBici = {
            "caption": "",
            "color": "#008000",
            // "dataField": "MAGNITUDE", 
            "dataFormat": "value",
            // "dataLabelField": "PLACE ",
            // "layer": capaEntidades,
            "maxDataValue": maxValue, 
            "noFeatureLabel": "No name",
            "noDataLabel": 60000,
            "title": "",
            "unitLabel": "",
            "value": poblacionAccesoBici
            }
        
            var miGaugeBici = new Gauge(gaugeParamsBici, this.cajaGaugeBicis2)
            // miGauge.set("value", 2)
        
        
            miGaugeBici.startup()

            this.porcentajePoblacionBicis2.innerHTML = "<b>" + "<u>" + ((poblacionAccesoBici / maxValue)*100).toFixed(2) + " %" + "</u>" + "</b>" + ' de población con acceso actualmente'



        }))
       console.log('startup');
      },

      MostrarBus2: function(){
        this.boton1.style.color = "black"
        this.boton2.style.color = "white"
        var cajaBici = this.cajaBici2
        if (cajaBici.style.display == 'block'){
          cajaBici.style.display = 'none'
        }
        var cajaBus = this.cajaBus2
        cajaBus.style.display = 'block'
      },

      MostrarBici2: function(){
        this.boton2.style.color = "black"
        this.boton1.style.color = "white"
        var cajaBus = this.cajaBus2
        if(cajaBus.style.display == 'block'){
          cajaBus.style.display = 'none'
        }
        var cajaBici = this.cajaBici2
        cajaBici.style.display = 'block'
      },

      onOpen: function(){
        console.log('onOpen');
      },

      onClose: function(){
        console.log('onClose');
      },

      onMinimize: function(){
        console.log('onMinimize');
      },

      onMaximize: function(){
        console.log('onMaximize');
      },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });