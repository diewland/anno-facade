window.AnnoFacade = {

  render: function(anno_img_id, draw_something){

    // append temp canvas to body
    document.querySelector('body').insertAdjacentHTML('beforeend', "<canvas id='_tmp_canvas' style='display: none;'></canvas>");

    // prepare doms & facade objects
    var img_dom   = document.getElementById(anno_img_id);
    var stage_dom = document.getElementById('_tmp_canvas');
    var stage     = new Facade(stage_dom);

    // start draw canvas
    stage.draw(function (){

      // reset all
      this.clear();

      // update canvas size
      stage_dom.width  = img_dom.width;
      stage_dom.height = img_dom.height;

      // draw something
      draw_something(this);

      // stop auto render
      this.stop();

      // inject layout inside annotorious box
      /* z-index    object
           1       anno stuff
           0       anno stuff
          -1       #inject_img <-- inject this
          -2       #anno_img   <-- make this absolute z-2 */
      img_dom.style.position = 'absolute';
      img_dom.style.zIndex = -2;
      img_dom.parentNode.insertAdjacentHTML('beforeend', "<img id='inject_img' style='position: absolute; z-index: -1; top: 0; left: 0;' />");
      document.getElementById('inject_img').src = stage.exportBase64();

      // remove facade stuffs
      stage_dom.remove();
      stage = null;
    });
 
  }

};
