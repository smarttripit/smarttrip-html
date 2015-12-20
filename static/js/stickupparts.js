jQuery(function($) {
      $(document).ready( function() {
        $('.navbar-wrapper').stickUp({
                      parts: {                         
                        0:'basic_information',
                        1: 'spot_tickets',
                        2: 'traffic_guidance',
                        3: 'zhouzhou_tips',
                        4: 'travel_details',
                        5: 'zhouzhou_comment'
                        
                      },
                      parts1: {                         
                        0:'basic_information1',
                        1: 'spot_tickets1',
                        2: 'traffic_guidance1',
                        3: 'zhouzhou_tips1',
                        4: 'travel_details1',
                        5: 'zhouzhou_comment1'
                      },
                      itemClass: 'menuItem',
                      itemHover: 'active',
                      topMargin: 'auto'
                    });
      });
    });