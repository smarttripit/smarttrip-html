// 无刷新分页
function pagination(paginationOptions) {
	var domId = paginationOptions.domId;
	var url = paginationOptions.url;
	var page = paginationOptions.page;
	var rows = paginationOptions.rows;
	paginationOptions.queryParams.page = paginationOptions.page;
	paginationOptions.queryParams.rows = paginationOptions.rows;
	var queryParams = paginationOptions.queryParams;
	$.ajax({
		type : "GET",
		url : url,
		cache : false,
		data : queryParams,
		dataType : "json",
		success : function(result) {
			var data = result.data;
			var dataList = data.rows;
			paginationOptions.dealData(dataList);
			var element = $('#' + domId); //对应下面ul的ID
			var pages = Math.ceil(data.total / rows); //这里data里面有数据总量
			if(pages != 0){//没有数据，则不初始化分页条
				var options = {
						bootstrapMajorVersion : 3,
						currentPage : page, //当前页面
						numberOfPages : 5, //一页显示几个按钮（ 在ul里面生成5个li）
						totalPages : pages, //总页数
						tooltipTitles : function(type, page, current) {
							if (type == 'first') {
								return "首页";
							} else if (type == 'prev') {
								return "上一页";
							} else if (type == 'page') {
								return "跳转到第" + page + "页";
							} else if (type == 'next') {
								return "下一页";
							} else if (type == 'last') {
								return "尾页";
							}
						},
						onPageClicked : function(event, originalEvent, type, page) {
							paginationOptions.page = page;
							pagination(paginationOptions);
						}
					}
					element.bootstrapPaginator(options);
			}
		}
	});
}