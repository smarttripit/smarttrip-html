 jQuery(function($) {
      $(document).ready( function() {
        $('.navbar-wrapper').stickUp({

          parts: {                         
            0:'hotel_style',
            1: 'basic_information',
            2: 'traffic_guidance',
            3: 'zhouzhou_tips',
            4: 'travel_details',
            5: 'zhouzhou_comment',
            6:'similar_comment'
            
          },
          parts1: {                         
            0:'hotel_style1',
            1: 'basic_information1',
            2: 'traffic_guidance1',
            3: 'zhouzhou_tips1',
            4: 'travel_details1',
            5: 'zhouzhou_comment1',
            6:'similar_comment1'
          },
          itemClass: 'menuItem',
          itemHover: 'active',
          topMargin: 'auto'
        });
      });
  //时间选择器
  $("#date_in").datepicker(); 
  $("#date_out").datepicker();
    });