mbrApp.loadComponents(
	"witsec-modal-window",
	{"witsec-modal-window-block":{
			_group:"witsec",
			_onParamsShow: function(e,$params,$block) {
				// Replace all characters (except letters, numbers and dashes) to dashes, so modal names end up with proper names
				this._params.modalName = this._params.modalName.replace(/([^a-z0-9\-]+)/img, '-');

				// If we don't encode the textareas, it'll mess up the HTMLCode textarea in the gear box
				// And we have to do this again in the _onParamsChange block as well
				// The encoded textareas are automatically decoded, so the result is as it should be :)
				this._params.modalBody = this.modalBody.replace(/<\/textarea/gim, "&lt;/textarea");
			},
			_params:{
				modalNotice:         {type:"separator",title: "The block on the left will not be visible on preview/publish."},
				modalName:           {type:"text",title:"Modal Name (must be unique)",default:""},
				modalSize:           {type:"select",title:"Size",values:{small:"Small",medium:"Medium",large:"Large"},default:"medium"},
				modalHeader:         {type:"switch",title:"Header",default:!0,condition:["modalName"]},
				modalTitle:          {type:"text",title:"Title",default:"Modal title",condition:["modalName", "modalHeader"]},
				modalBody:           {type:"textarea",title:"Body",default:"Modal body text goes here.",condition:["modalName"]},
				modalBodyHTML:       {type:"switch",title:"Enable HTML",default:!1,condition:["modalName"]},
				modalFooter:         {type:"switch",title:"Footer",default:!0,condition:["modalName"]},
				modalCloseBtn:       {type:"switch",title:"Close Button",default:!0,condition:["modalName", "modalFooter"]},
				modalCloseText:      {type:"text",title:"Close Button Caption",default:"Close",condition:["modalName", "modalFooter", "modalCloseBtn"]},
				modalLink:           {type:"switch",title:"Link Button",default:!1,condition:["modalName", "modalFooter"]},
				modalLinkUrl:        {type:"text",title:"Link URL",default:"https://mobirise.com/",condition:["modalName", "modalFooter", "modalLink"]},
				modalLinkText:       {type:"text",title:"Link Text",default:"Visit Mobirise",condition:["modalName", "modalFooter", "modalLink"]},
				modalLinkNewWindow:  {type:"switch",title:"Open in New Window",default:!0,condition:["modalName", "modalFooter", "modalLink"]},
				modalVerticalCenter: {type:"switch",title:"Vertically Centered",default:!1,condition:["modalName"]},
				modalFade:           {type:"switch",title:"Fade Effect",default:!0,condition:["modalName"]}
			},
			modalTest: "Please use the gear-icon to change the modal name.",
			modalBody: "Modal body text goes here.",
			_onParamsChange: function($item, param, val) {

				if (param == "modalName") {
					// Only allow letters, numbers and dashes
					val = val.replace(/([^a-z0-9\-]+)/img, '-');

					// If the parameter is empty, we can't do much
					if (val == "") {
						this.modalTest = "Please use the gear-icon to change the modal name.";
						this.modalWindow = "";
					}
					else {
						// Buttons to preview modal and how-to-use window
						this.modalTest  = '<div class="mbr-section-btn">';
						this.modalTest += '<a href="#" class="btn btn-primary display-4" data-toggle="modal" data-target="#' + val + '">Preview ' + val + '</a>';
						this.modalTest += '<a href="#" class="btn btn-primary display-4" data-toggle="modal" data-target="#' + val + '-howtouse">How to use ' + val + '</a>';
						this.modalTest += '</div>';

						// Modal window for how-to-use
						this.modalTest += '<div class="modal fade" id="' + val + '-howtouse" tabindex="-1" role="dialog" aria-labelledby="' + val + '-howtouseLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="' + val + '-howtouseLabel">How to use?</h5><a href="" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a></div>';
						this.modalTest += '<div class="modal-body">Using your new modal is very easy. Simply create a new link, then click the "..." tab and enter the following as custom URL:<br /><br /><code>javascript:OpenModal(\'' + val + '\')</code></div>';
						this.modalTest += '<div class="modal-footer"><div class="mbr-section-btn"><a href="#" class="btn btn-secondary display-4" data-dismiss="modal">Close</a></div></div></div></div></div>';
					}
				}

				if (param == "modalBody") {
					// We write the modalBody to the "html"
					this.modalBody = val;
					
					// A little hack regarding textareas, in case someone would ever want to add a textarea to this type of modal window...
					this._params.modalBody = this.modalBody.replace(/<\/textarea/gim, "&lt;/textarea");
				}

				// No matter what param changes, we need to change the modal to reflect this change
				if (this._params.modalName != "") {
					var p = this._params;
					
					switch (p.modalSize) {
						case "small":	var size = "modal-sm";
										break;
						case "large":	var size = "modal-lg";
										break;
						default:		var size = "";
					}

					var m = "";
					m += '<div class="modal ' + (p.modalFade ? "fade" : "") + '" id="' + p.modalName + '" tabindex="-1" role="dialog" aria-labelledby="' + p.modalName + 'Label" aria-hidden="true">';
					m += '  <div class="modal-dialog ' + size + ' ' + (p.modalVerticalCenter ? "modal-dialog-centered" : "") + '" role="document">';
					m += '    <div class="modal-content">';

					// Header
					if (p.modalHeader) {
						m += '<div class="modal-header">';
						m += '  <h5 class="no-anim modal-title" id="' + p.modalName + 'Label">' + p.modalTitle + '</h5>';
						m += '  <a href="#" class="no-anim close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>';
						m += '</div>';
					}

					// Body
					if (p.modalBodyHTML) {
						// If HTML is enabled, accept everything
						b = this.modalBody;
					}
					else {
						// If HTML is disabled, replace any "<" with "&lt;" and replace \n with HTML breaklines
						b = this.modalBody.replace(/</g, "&lt;").replace(/\n|\r/g, "<br />");
					}
					m += '<div class="modal-body">' + b + '</div>';

					// Footer
					if (p.modalFooter) {
						m += '<div class="modal-footer">';

						// Close Btn
						if (p.modalCloseBtn) {
							m += '<div class="mbr-section-btn"><a href="#" class="no-anim btn btn-secondary display-4" data-dismiss="modal">' + p.modalCloseText + '</a></div>';
						}

						// Link
						if (p.modalLink) {
							m += '<div class="mbr-section-btn"><a href="' + p.modalLinkUrl + '" class="no-anim btn btn-primary display-4" ' + (p.modalLinkNewWindow ? "target=_new" : "") + '>' + p.modalLinkText + '</a></div>';
						}

						m += '</div>';
					}

					m += '    </div>';
					m += '  </div>';
					m += '</div>';
					this.modalWindow = m;
				}
			},
			_publishFilter: function($obj) {
				$obj.find(".witsec-modal-window-test").remove();
				$obj.find(".witsec-modal-window-body").remove();
			}	
		}
	}
);
