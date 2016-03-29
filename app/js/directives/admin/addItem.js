angular.module('AdminCtrl').directive('addItem', function(){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			triggers: '=', 
			allData: '=',
			saveItems:'='
		},
		controller: function($scope, itemsService){
			$scope.newItem = {
				name: 'Name',
				price: "Price",
				description: 'description',
				region: "region",
				roast: "roast",
				image: "image"
			};
			// create new item
			$scope.addItem = function(){	
				console.log($scope.newItem);
				var newItem = JSON.stringify($scope.newItem);

				itemsService.post(newItem).success(function(response){
					$scope.allData.unshift(response.coffees); // add to top of list;
				})
				.error(function(data){
					console.log(' post error');
				}) 
			} 

// 			var inputElement = document.getElementById("input");
// inputElement.addEventListener("change", handleFiles, false);
// function handleFiles() {
//   var fileList = this.files; /* now you can work with the file list */
// }
		},
		link: function(scope, elem, attrs){

			// var inputElement = $('#photoUpload');
			
			// inputElement.on('change', function(){
			// 	var file = this.files[0]
			// 	var preview = $(".background.front");

			// 	var imageUrl = window.URL.createObjectURL(file);
			// 	debugger
			// 	preview.css("background-image", "url(imageUrl)")

 
			// });
			document.getElementById('photoUpload').addEventListener('change', readUrl, true);

			function readUrl(){
				var file = document.getElementById('photoUpload').files[0];
				var reader = new FileReader();
 				reader.onloadend = function(){
				document.getElementById('uploadPreview').style.backgroundImage = "url(" + reader.result + ")";        
		   }
		   if(file){
		      reader.readAsDataURL(file);
		    }else{
					console.log('else')
				}
			}

		},
		templateUrl: 'views/admin/addItem.html'
	}
})