          $("#file-1").fileinput({
          uploadUrl: '#', // you must set a valid URL here else you will get an error
          allowedFileExtensions : ['jpg', 'png','gif'],
          overwriteInitial: false,
          maxFileSize: 1000,
          maxFilesNum: 10,          
          slugCallback: function(filename) {
              return filename.replace('(', '_').replace(']', '_');
          }
    });

    $(document).ready(function() {
          $("#test-upload").fileinput({
              'showPreview' : false,
              'allowedFileExtensions' : ['jpg', 'png','gif'],
              'elErrorContainer': '#errorBlock'
          });
    });