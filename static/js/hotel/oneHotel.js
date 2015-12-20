 jQuery(function($) {
      $(document).ready( function() {
        $('.navbar-wrapper').stickUp({

          parts: {                         
            0:'hotel_style',
            1: 'hotel_address',
            2: 'hotel_information',
            3: 'hotel_photos',
            4: 'hotel_policy',
            5: 'hotel_infrastructure',
            6: 'neighbor_infrastructure',
            7: 'zhouzhou_commend',
            8: 'zhouzhou_comment'
            
          },
          parts1: {                         
            0:'hotel_style1',
            1: 'hotel_address1',
            2: 'hotel_information1',
            3: 'hotel_photos1',
            4: 'hotel_policy1',
            5: 'hotel_infrastructure1',
            6: 'neighbor_infrastructure1',
            7: 'zhouzhou_commend1',
            8: 'zhouzhou_comment1'
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