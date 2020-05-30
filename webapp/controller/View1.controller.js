sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (Controller, JSONModel,MessageBox) {
	"use strict";

	return Controller.extend("SapOdata.controller.View1", {

			onInit: function () {

				this._oView = this.getView();

				var oViewModel = new JSONModel({

						PoNumber: "",
						Lifnr: "",
						Waers: "",
						Bukrs: ""
					

				});

			this._oView.setModel(oViewModel, "viewModel");
			//Liste güncelleme
			this._oTable = this._oView.byId("table0");
		},
		
		onAddPO: function(){
			debugger;
			
			var oModel = this._oView.getModel(),
				sPath = "/PurchaseOrderSet" ,
				oData = {},
				sParameters = {};
				
				oData.Ponumber = this._oView.getModel("viewModel").getProperty("/PoNumber");
				oData.Lifnr    = this._oView.getModel("viewModel").getProperty("/Lifnr");
				oData.Waers    = this._oView.getModel("viewModel").getProperty("/Waers");
				oData.Bukrs    = this._oView.getModel("viewModel").getProperty("/Bukrs");
				
				sParameters.success = function(oData2,oResponse){
					debugger;
					var oBinding = this._oTable.getBinding("items");//Liste güncelleme
					oBinding.filter([]);//Liste güncelleme
			   MessageBox.success("Satınalma başarılı bir biçimde oluşturuldu");
				}.bind(this);
				
				sParameters.error = function(oError){
					debugger;
					MessageBox.error("Satınalma Hatalıdır.Oluşturma başarısız.!");
				};
				
				oModel.create(sPath,oData,sParameters);
		}

	});

});