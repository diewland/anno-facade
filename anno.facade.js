window.AnnoFacade = {

  render: function(anno_img_id, draw_something){

    // append temp canvas to body
    document.body.innerHTML += "<canvas id='_tmp_canvas' style='display: none;'></canvas>";

    // prepare doms & facade objects
    var img_dom   = document.getElementById(anno_img_id);
    var stage_dom = document.getElementById('_tmp_canvas');
    var stage     = new Facade(stage_dom);
    var fimg      = new Facade.Image(img_dom.src);

    // before do anything, load image first
    fimg.image.addEventListener('load', function(){

      // start draw canvas
      stage.draw(function (){
        var that = this;

        // reset all
        this.clear();

        // update canvas size
        stage_dom.width  = fimg.image.width;
        stage_dom.height = fimg.image.height;

        // draw image
        this.addToStage(fimg);

        // draw more
        draw_something(this);

        // stop auto render
        this.stop();

        // export custom canvas to annotorious image
        img_dom.src = stage.exportBase64();
        
        // remove all facade stuffs
        stage_dom.remove();
        stage = null;
        fimg  = null;
      });

    });
   
  }

};
