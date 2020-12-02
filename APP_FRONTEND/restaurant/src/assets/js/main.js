var itemList = {
  items: [],
  subtotal: 0
}

$(document).ready(function() {

  function getStorageData() {
      itemList.items = JSON.parse(localStorage.getItem('cartItems') || JSON.stringify(itemList.items));
  }

  $(document).on("click", "#updatecart", function() {
      var data = getLocatStoragedata();
      var newquan = $(this).siblings('#quan').val();
      var itemdata = $(this).siblings('#foodguid').val();

      if (newquan != 0) {
          var index = -1;
          data.forEach(function(item, i) {
              if (item.ItemID === itemdata) {
                  index = i;
              }
          });


          data[index].quantity = newquan;

      } else {
          data.splice(index, 1);
      }
      setLocalStorageData(data);
      window.location.reload();

  });


  $(document).on("click", "#deleteitem", function() {
      var data = getLocatStoragedata();
      var itemdata = $(this).siblings('#foodguid').val();

      var index = -1;
      data.forEach(function(item, i) {
          if (item.ItemID === itemdata) {
              index = i;
          }
      });
      data.splice(index, 1);
      setLocalStorageData(data);
      window.location.reload();

  });


  function backgroundrender() {
      getStorageData();
      $(".cart-text").text(itemList.items.length);
      if(itemList.items.length == 0 || itemList.items.length == undefined)
       $("#checkout").hide();

      var url = window.location.href;
      if (url != "http://localhost:4200/") {
          $("#bodyimage").removeClass('bodyimage');
          $(".navbar").attr('style', 'background-color: #f0b908');

      } else {
          $("#bodyimage").addClass('bodyimage');
          $(".navbar").attr('style', 'background-color: transparent');
      }
  }
  backgroundrender();

  $(".otherpage").click(function() {
      backgroundrender();
  });

  // to reload the menu after seach box is empty
  document.getElementById("searchstring").addEventListener("search", function(event) {
      window.location.reload();

  });

  $("#logout").click(function() {
      sessionStorage.removeItem("usertoken");
      window.location.href = "/";
  });


  $(document).on("click", "#addtocart", function() {

      var quantity = $(this).siblings("input").val();
      var currentItemImage = $(this).parent().siblings().children('img').attr('src');
      var currentItem = $(this).parent().siblings().children('#foodname').html();
      var currentPrice = $(this).parent().siblings().children('#foodprice').text();
      var currentitemId = $(this).parent().siblings().children('#foodid').val();

      itemList.items = getLocatStoragedata(); // fetch existing items in cart
      itemList.items.push({
          itemImage: currentItemImage,
          itemName: currentItem,
          itemPrice: currentPrice,
          quantity: quantity,
          item_id: currentitemId,
          ItemID: currentItem + Math.random() // unique ID for each item even though same product
      })
      setLocalStorageData(itemList.items);
      window.location.href = "/menu";

  });

  // get data from localstorage
  function getLocatStoragedata() {
      return JSON.parse(localStorage.getItem('cartItems') || JSON.stringify(itemList.items));
  }
  // set data to localstorage
  function setLocalStorageData(data) {
      localStorage.setItem("cartItems", JSON.stringify(data));
  }

  $(function() {

      $(document).on("click", ".navli", function() {

          var x = sessionStorage.getItem("usertoken");
          if (x == null || x == undefined) {
              $("#btnupdate").hide();
              $("#btndelete").hide();
              $("#btnaddnewfood").hide();
              $(".editclick").addClass("inactiveLink");
          } else {
              $("#login").hide();
              $("#logout").show();

          }
      });

  });

});