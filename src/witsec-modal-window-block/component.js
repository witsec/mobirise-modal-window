defineM("witsec-modal-window", function(g, mbrApp, tr) {
    mbrApp.loadComponents(
        "witsec-modal-window",
        {
            "witsec-modal-window-block": {
                _group: "witsec",
                _onParamsShow: function(e, $params, $block) {
                    this._params.modalBody = this.modalBody.replace(/<\/textarea/gim, "&lt;/textarea");
                },
                _params: {
                    modalNotice: {type: "separator", title: "The block on the left will not be visible on preview/publish"},
                    modalName: {type: "text", title: "Modal Name (must be unique)", default: ""},
                    modalSize: {
                        type: "select",
                        title: "Size",
                        values: {small: "Small", medium: "Medium", large: "Large"},
                        default: "medium",
                        condition: ["modalName"]
                    },
                    modalHeader: {
                        type: "switch",
                        title: "Header",
                        default: !0,
                        condition: ["modalName"]
                    },
                    modalTitle: {
                        type: "text",
                        title: "Title",
                        default: "Modal title",
                        condition: ["modalName", "modalHeader"]
                    },
                    modalBody: {
                        type: "textarea",
                        title: "Body",
                        default: "Modal body text goes here.",
                        condition: ["modalName"]
                    },
                    modalBodyHTML: {
                        type: "switch",
                        title: "Enable HTML",
                        default: !1,
                        condition: ["modalName"]
                    },
                    modalFooter: {
                        type: "switch",
                        title: "Footer",
                        default: !0,
                        condition: ["modalName"]
                    },
                    modalCloseBtn: {
                        type: "switch",
                        title: "Close Button",
                        default: !0,
                        condition: ["modalName", "modalFooter"]
                    },
                    modalCloseText: {
                        type: "text",
                        title: "Close Button Caption",
                        default: "Close",
                        condition: ["modalName", "modalFooter", "modalCloseBtn"]
                    },
                    modalLink: {
                        type: "switch",
                        title: "Link Button",
                        default: !1,
                        condition: ["modalName", "modalFooter"]
                    },
                    modalLinkUrl: {
                        type: "text",
                        title: "Link URL",
                        default: "https://mobirise.com/",
                        condition: ["modalName", "modalFooter", "modalLink"]
                    },
                    modalLinkText: {
                        type: "text",
                        title: "Link Text",
                        default: "Visit Mobirise",
                        condition: ["modalName", "modalFooter", "modalLink"]
                    },
                    modalLinkNewWindow: {
                        type: "switch",
                        title: "Open in New Window",
                        default: !0,
                        condition: ["modalName", "modalFooter", "modalLink"]
                    },
                    modalVerticalCenter: {
                        type: "switch",
                        title: "Vertically Centered",
                        default: !1,
                        condition: ["modalName"]
                    },
                    modalFade: {
                        type: "switch",
                        title: "Fade Effect",
                        default: !0,
                        condition: ["modalName"]
                    },
                    modalAutoOpen: {
                        type: "switch",
                        title: "Open Automatically",
                        default: !1,
                        condition: ["modalName"]
                    },
                    modalAutoOpenOnce: {
                        type: "switch",
                        title: "Open Once",
                        default: !0,
                        condition: ["modalName", "modalAutoOpen"]
                    },
                    modalAutoOpenGDPR: {
                        type: "switch",
                        title: "GDPR Compliant",
                        default: !0,
                        condition: ["modalName", "modalAutoOpen", "modalAutoOpenOnce"]
                    },
                    modalAutoOpenDelay: {
                        type: "range",
                        title: "Auto Open Delay",
                        min: 0,
                        max: 10,
                        step: 1,
                        default: 0,
                        condition: ["modalName", "modalAutoOpen"]
                    },
					modalBackgroundColor: {
                        type: "color",
                        title: "Background Color",
                        default: "#FFFFFF",
						condition: ["modalName"]
                    },
					modalFontColor: {
                        type: "color",
                        title: "Text Color",
                        default: "#000000",
						condition: ["modalName"]
                    }
                },
                modalTest: "Please use the gear-icon to change the modal name",
                modalBody: "Modal body text goes here",
                _onParamsChange: function($item, param, val) {
                    if (param == "modalName") {
                        this._params.modalName = this._params.modalName.replace(/([^a-z0-9\-]+)/img, '-');
                        val = val.replace(/([^a-z0-9\-]+)/img, '-');
                        if (val == "") {
                            this.modalTest = "Please use the gear-icon to change the modal name";
                            this.modalWindow = "";
                        } else {
                            this.modalTest = [
                                '<div class="mbr-section-btn">',
                                '  <a href="#" class="btn btn-primary display-4" data-toggle="modal" data-target="#' + val + '" data-bs-toggle="modal" data-bs-target="#' + val + '">Preview ' + val + '</a>',
                                '  <a href="#" class="btn btn-primary display-4" data-toggle="modal" data-target="#' + val + '-howtouse" data-bs-toggle="modal" data-bs-target="#' + val + '-howtouse">How to use ' + val + '</a>',
                                '</div>',
                                '<div class="modal fade" id="' + val + '-howtouse" tabindex="-1" role="dialog" aria-labelledby="' + val + '-howtouseLabel" aria-hidden="true">',
                                '  <div class="modal-dialog" role="document" style="height:auto">',
                                '    <div class="modal-content">',
                                '      <div class="modal-header">',
                                '        <h5 class="modal-title display-7" id="' + val + '-howtouseLabel">How to use?</h5>',
                                '        <a href="" class="close" data-bs-dismiss="modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>',
                                '      </div>',
                                '      <div class "modal-body display-7">',
                                '        Using your new modal is very easy. Simply create a new link, then click the "..." tab and enter the following as custom URL:<br /><br />',
                                '        <code>javascript:OpenModal(\'' + val + '\')</code>',
                                '      </div>',
                                '      <div class="modal-footer">',
                                '        <div class="mbr-section-btn"><a href="#" class="btn btn-secondary display-4" data-bs-dismiss="modal" data-dismiss="modal">Close</a></div>',
                                '      </div>',
                                '    </div>',
                                '  </div>',
                                '</div>'
                            ].join("\n");
                        }
                    }
                    if (param == "modalBody") {
                        this.modalBody = val;
                        this._params.modalBody = this.modalBody.replace(/<\/textarea/gim, "&lt;/textarea");
                    }
                    if (this._params.modalName != "") {
                        var p = this._params;
                        switch (p.modalSize) {
                            case "small":
                                var size = "modal-sm";
                                break;
                            case "large":
                                var size = "modal-lg";
                                break;
                            default:
                                var size = "";
                        }
                        var m = "";
                        m += '<div class="modal ' + (p.modalFade ? "fade" : "") + '" id="' + p.modalName + '" tabindex="-1" role="dialog" aria-labelledby="' + p.modalName + 'Label" aria-hidden="true">';
                        m += '  <div class="modal-dialog ' + size + ' ' + (p.modalVerticalCenter ? "modal-dialog-centered" : "") + '" style="height:auto" role="document">';
                        m += '    <div class="modal-content">';
                        if (p.modalHeader) {
                            m += '<div class="modal-header" style="background-color: ' + this._params.modalBackgroundColor + '; color: ' +  this._params.modalFontColor + ';">';
                            m += '  <h5 class="no-anim modal-title display-7" id="' + p.modalName + 'Label">' + p.modalTitle + '</h5>';
                            m += '  <a href="#" class="no-anim close" data-bs-dismiss="modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>';
                            m += '</div>';
                        }
                        if (p.modalBodyHTML) {
                            b = this.modalBody;
                        } else {
                            b = this.modalBody.replace(/</g, "&lt;").replace(/\n|\r/g, "<br />");
                        }
                        m += '<div class="modal-body display-7" id="' + p.modalName + '_body"   style="background-color: ' + this._params.modalBackgroundColor + '; color: ' +  this._params.modalFontColor + ';">' + b + '</div>';
                        if (p.modalFooter) {
                            m += '<div class="modal-footer" style="background-color: ' + this._params.modalBackgroundColor + '; color: ' +  this._params.modalFontColor + ';">';
                            if (p.modalCloseBtn) {
                                m += '<div class="mbr-section-btn"><a href="#" class="no-anim btn btn-secondary display-4" data-bs-dismiss="modal" data-dismiss="modal">' + p.modalCloseText + '</a></div>';
                            }
                            if (p.modalLink) {
                                m += '<div class="mbr-section-btn"><a href="' + p.modalLinkUrl + '" class="no-anim btn btn-primary display-4" ' + (p.modalLinkNewWindow ? "target=_new" : "") + '>' + p.modalLinkText + '</a></div>';
                            }
                            m += '</div>';
                        }
                        m += '    </div>';
                        m += '  </div>';
                        m += '</div>';
                        m += '<script>\n',
                        m += 'document.addEventListener("DOMContentLoaded", function() {\n',
                        m += '  if(typeof jQuery === "function") {\n';
                        m += '    $("#' + p.modalName + '").on("hidden.bs.modal", function () {\n';
                        m += '      var html = $( "#' + p.modalName + '_body" ).html();\n';
                        m += '      $( "#' + p.modalName + '_body" ).empty();\n';
                        m += '      $( "#' + p.modalName + '_body" ).append(html);\n';
                        m += '    })\n';
                        m += '  } else {\n';
                        m += '      var mdw = document.getElementById("#' + p.modalName + '")\n';
                        m += '      mdw.addEventListener("hidden.bs.modal", function(event) {\n';
                        m += '        mdw.innerHTML = mdw.innerHTML;\n';
                        m += '      });\n';
                        m += '  }\n';
                        m += '});\n',
                        m += '</script>';
                        this.modalWindow = m;
                    }
                },
                _publishFilter: function($obj) {
                    $obj.find(".witsec-modal-window-test").remove();
                    $obj.find(".witsec-modal-window-body").remove();
                    if (this._params.modalAutoOpen) {
                        var n = this._params.modalName;
                        if (this._params.modalAutoOpenOnce) {
                            var m = [
                                '<script>',
                                'document.addEventListener("DOMContentLoaded", function() {',
                                '  if (modalGetCookie("' + n + '_viewed") == "") {',
                                '    setTimeout( function() {',
                                '      ' + (this._params.modalAutoOpenGDPR ? "if (document.cookie)" : ""),
                                '        modalSetCookie("' + n + '_viewed", true, 3600);',
                                '      OpenModal("' + n + '");',
                                '    } , ' + this._params.modalAutoOpenDelay * 1000 + ');',
                                '  }',
                                '});',
                                '</script>'
                            ].join("\n");
                        } else {
                            var m = [
                                '<script>',
                                'document.addEventListener("DOMContentLoaded", function() {',
                                '  setTimeout( function() { OpenModal("' + n + '"); } , ' + this._params.modalAutoOpenDelay * 1000 + ');',
                                '});',
                                '</script>'
                            ].join("\n");
                        }
                        $obj.append(m);
                    }
                }
            }
        });
}, ["jQuery", "mbrApp", "TR()"]);
