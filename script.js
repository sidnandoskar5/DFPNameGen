var app = function(){
    var generateHTML = function(page){
        var html = '<div class="col-wrap" id="dfp_'+page+'">';
        html += '<div class="col">';
        html += '<span class="label">' + page + '</span>';
        html += '</div>';
        app.sizes.forEach(size => {
            html += '<div class="col">';
            html += '<input type="number" min="0" data-details="'+page+'-'+size+'" placeholder="'+size+'" />';
            html += '</div>';
        });
        html += '</div>';
        return html;
    }
    return {
        account: '/45361917/',
        pages : ['HomePage','SERP','Product-Details-Category','Blog-Article-List-Category','Local-Listings-Details','Other'],
        sizes: ['300x250','728x90','300x600'],
        init: function(){
            var html = "";
            this.pages.forEach(page => {
                html += generateHTML(page);
            });

            document.querySelector('#dfp-wrap').innerHTML = html;
        },
        genDFPNames : function(){
            var names = '';
            var siteName = document.querySelector("#site-name").value;
            var inputs = document.querySelectorAll("input");
            
            if(siteName === ''){
                alert("Enter Site Name");
                return;
            }

            inputs.forEach(input => {
                var inputVal = input.value;
                var inputDetails = input.getAttribute("data-details");
                if(inputVal != ''){
                    for(var i=1;i<=parseInt(inputVal);i++){
                        names+= app.account + siteName + '-' + inputDetails + '-' + i + '\r\n';
                    }
                }
            });
            document.querySelector("#dfp-name-view").value = names;
        },
        
        genDFPIds: function(){
            var idPrefix = 'div-gpt-ad-';
            var inputids = document.querySelector('#get-dfp-ids').value;
            if(inputids == "") return;
            var data = inputids.replace(/\r\n/g,"\n").split("\n");
            var newIds = "";
            data.forEach(id => {
                newIds+= idPrefix+id+'-0'+'\r\n';
            });
            document.querySelector("#set-dfp-ids").value = newIds;
        }
    }
}();
app.init();
// document.querySelector("#name-gen-btn").addEventListener("click", function(){
//     document.querySelector("#name-gen").style.display  = "block";
//     document.querySelector("#id-gen").style.display  = "none";
// });
// document.querySelector("#id-gen-btn").addEventListener("click", function(){
//     document.querySelector("#name-gen").style.display  = "none";
//     document.querySelector("#id-gen").style.display  = "block";
// });
document.querySelector("#btn-submit").addEventListener("click", app.genDFPNames);
// document.querySelector("#btn-id-submit").addEventListener("click", app.genDFPIds);