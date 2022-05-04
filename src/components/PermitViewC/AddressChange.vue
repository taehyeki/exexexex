<template>
  <span
    id="address-kakao1"
    class="changeAddr"
  >주소 변경하기</span>
</template>
<script>
import {mapMutations} from "vuex"
export default {
   mounted(){
    document.getElementById("address-kakao1").addEventListener("click", () => {
        // eslint-disable-next-line no-undef
        new daum.Postcode({
            oncomplete: (data) => {
                console.log(data)
                let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
                let extraRoadAddr = ''; // 도로명 조합형 주소 변수
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                } // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                } // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                } // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
                if(fullRoadAddr !== ''){ fullRoadAddr += extraRoadAddr;
                } // 우편번호와 주소 정보를 해당 필드에 넣는다.



                Promise.resolve(data).then(()=>{
                  return new Promise((resolve,reject)=>{
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.addressSearch(fullRoadAddr,(result,status)=>{
                      if(status === window.kakao.maps.services.Status.OK){
                          const { x, y } = result[0];
                          resolve({ lat: y, log: x })
                      }else{
                          reject();
                      }
                    })
                  })
                }).then(result => {
                  let lat = parseFloat(result.lat)
                  let lng = parseFloat(result.log)
                  this.setAddr({ addr : data.address+', ', bCode : data.bcode, lat, lng } )
                })

            },
            animation : true,
            onclose: (state) => {
                if(state === 'COMPLETE_CLOSE') alert('상세 주소를 뒤에 이어서 적어주세요!')
            },

        }).open();
    });
  },
  methods : {
    ...mapMutations('permit',['setAddr'])
  }
}
</script>
<style lang="scss">
.changeAddr{
  cursor : pointer;
  display : inline-block;
  width : 100px;
  height : 30px;
  text-align : center;
  line-height : 30px;
  border : 1px solid;
  border-radius: 10px;
  &:hover {
    background-color: burlywood;
    color: white;
  }
}
</style>
