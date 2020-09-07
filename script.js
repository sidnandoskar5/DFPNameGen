var app = function(){
    var generateHTML = function(page){
        var html = '<div class="col-wrap" id="dfp_'+page+'">';
        html += '<div class="col">';
        html += '<span class="label">' + page + '</span>';
        html += '</div>';
        app.sizes.forEach(size => {
            html += '<div class="col">';
            html += '<input class="dfp-count" type="number" min="0" data-page="'+page+'" data-size="'+size+'" placeholder="'+size+'" />';
            html += '</div>';
        });
        html += '</div>';
        return html;
    }
    
    var generateResultHTML = function(data){
        var html = "";
        data.forEach(res => {
            html += '<div class="col">' + res.page + '</div>';
            html += '<div class="col"><input class="txt-copy" value="'+res.path+'" readonly>' + '</div>';
            html += '<div class="col"><input class="txt-copy" value="'+res.id+'" readonly>' + '</div>';
        })
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
            var data = [];
            var siteName = document.querySelector("#site-name").value;
            var inputs = document.querySelectorAll(".dfp-count");
            
            if(siteName === ''){
                alert("Enter Site Name");
                return;
            }

            inputs.forEach(input => {
                var inputVal = input.value;
                var size = input.getAttribute("data-size");
                var page = input.getAttribute("data-page");
                if(inputVal.length !=0 ){
                    for(var i=1;i<=parseInt(inputVal);i++){
                        var path = app.account + siteName.toLowerCase() + '-onodfp' + '/' + page + '-' + size + '-' + i;
                        var id = 'div-gpt-ad-'+ page + '-' + size + '-'+ i;
                        var pageName = page + " (" + size + ") - " + i;
                        data.push({page:pageName,path:path,id:id.toLowerCase()});
                    }
                }
            });
            document.querySelector("#results").innerHTML = generateResultHTML(data);
            app.addCopyEvent();
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
        },

        addCopyEvent: function(){
            document.querySelectorAll(".txt-copy").forEach(input => {
                input.addEventListener("click", app.copyToClipboard);
            })
        },

        copyToClipboard: function(){
            this.select();
            this.setSelectionRange(0, 99999);
            document.execCommand("copy");
            this.classList.add('copied');
            app.msg("Copied the text: " + this.value);
        },

        msg: function($msg){
            document.querySelector(".alert").innerHTML = $msg;
            document.querySelector(".alert").classList.add('show');
            setTimeout(() => { document.querySelector(".alert").classList.remove('show'); }, 10000);
        }
    }
}();
app.init();
document.querySelector("#btn-submit").addEventListener("click", app.genDFPNames);