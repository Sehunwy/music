import React from 'react'
import ReactDOM from 'react-dom';
class PlaylistView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            list:props.list
        }
    }

    alertPlaylist(id) {
        console.log(id);
        var src ;
        $('#Playlistchange').unbind('click').click(function () {
            var file = document.getElementById("fulAvatarPlaylist");
            var formDataPlaylist = new FormData();
            var fileObj =file.files[0];
            if(fileObj!=undefined) {
                formDataPlaylist.append("uploadImage", fileObj);
                var url = "http://localhost:8888/Playlistupload";
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formDataPlaylist,
                    processData: false,
                    contentType: false,
                    success: function (responseStr) {
                        alert("图片上传成功");
                        console.log("成功"+responseStr.newPath);
                        src =responseStr.newPath;
                    },
                    error: function (responseStr) {
                        alert("图片上传失败");
                        console.log("失败"+responseStr.newPath);
                        src =responseStr.newPath;
                    }
                });
            }
        });
        var data = {id:id};
        var url1 = "http://localhost:8888/selectPlaylistid";
        $.ajax({
            url: url1,
            type: "POST",
            // dataType: 'json',
            data: data,
            success: function (responsesyr) {
                var response = JSON.parse(responsesyr);
                var alertPlayName = document.getElementById('alertPlayName');
                var alertPlayLabel = document.getElementById('alertPlayLabel');
                var fulAvatarPlaylist = document.getElementById('fulAvatarPlaylist');

                $('#alertPlaylistsave').unbind('click').click(function () {
                    var playName = alertPlayName.value;
                    var playLabel = alertPlayLabel.value;
                    alertPlayName.value = '';
                    alertPlayLabel.value = '';
                    fulAvatarPlaylist.value = '';
                    if(src==undefined) {
                        src = response.playlist.playlist_pic;
                    }
                    if(playName=='') {
                        playName = response.playlist.playlist_name;
                    }
                    if(playLabel=='') {
                        playLabel = response.playlist.playlist_label;
                    }
                    var url2 = "http://localhost:8888/alterplaylist";
                    var dataPlay = {id:id,src:src,playName:playName,playLabel:playLabel};
                    $.ajax({
                        url: url2,
                        type: "POST",
                        // dataType: 'json',
                        data: dataPlay,
                        success: function (response1) {
                            var divrow = document.getElementsByClassName('playlist'+id);
                            divrow[0].innerHTML = "";
                            divrow[0].innerHTML = '<div title=' + playName + ' class="col-xs-3  omit">' + playName + '</div>'
                                + '<div class="col-xs-2">'
                                + '<img height="40px" src=' + src + ' alt="">'
                                + '</div>'
                                + '<div title=' + playLabel + '  class="col-xs-3 omit">' + playLabel + '</div>'
                                +'<div title=' + response.playlist.playlist_amount + ' class="col-xs-1  omit">' + response.playlist.playlist_amount + '</div>'
                                +'<div title=' + response.playlist.playlist_collection + ' class="col-xs-1  omit">' + response.playlist.playlist_collection + '</div>'
                                + '<div class="col-xs-2">'
                                + '<button onClick={this.alertPlaylist.bind(this,response.playlist.playlist_id)}  class="btn btn-success btn-xs" data-toggle="modal" data-target="#changeSour" >修改</button> <button onclick="deletePlaylist(' + id + ')"  class="btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteSour">删除</button></div>';


                        },
                        error: function (responseStr) {
                            console.log("失败"+responseStr);
                        }
                    });
                    var miss = document.getElementById('alertPlaylistmiss');
                    miss.click();
                });
            },
            error: function (responseStr) {
                console.log("失败"+responseStr);
            }
        });


    }

    deletePlaylist(id) {
        console.log("id   ==="+id);
        $('#deletePlaylistsave').unbind('click').click(function () {
            console.log("id   ==="+id);
            var url2 = "http://localhost:8888/deletePlaylist";
            $.ajax({
                url: url2,
                type: "POST",
                // dataType: 'json',
                data: {id:id},
                success: function (response1) {
                    var class_id = document.getElementsByClassName('playlist' + id);
                    $(class_id).remove();
                },
                error: function (responseStr) {
                    console.log("失败"+responseStr);
                }
            });
            var miss = document.getElementById('deletePlaylistmiss');
            miss.click();
            // var xmlRequest = new XMLHttpRequest();
            // xmlRequest.open('post','http://localhost:8088/deletePlaylist',true);
            // xmlRequest.send(id);
            // xmlRequest.onreadystatechange=function () {
            //     if (xmlRequest.readyState == 4 && xmlRequest.status == 200) {
            //         var data1 = JSON.parse(xmlRequest.responseText);
            //         var result = data1.result;
            //         if (result == 1) {
            //             var class_id = document.getElementsByClassName('playlist' + id);
            //             $(class_id).remove();
            //             var miss = document.getElementById('deletePlaylistmiss');
            //             miss.click();
            //         }
            //     }
            // }
        });
    }



    List(){
        const listItems = this.state.list.map((item) =>{

            if(item.playlist_name!=null) {
                return  <div key={item.playlist_id} className={'row playlist'+item.playlist_id}>
                    <div title={item.playlist_name} className="col-xs-3 omit">
                        {item.playlist_name}
                    </div>
                    <div className="col-xs-2 omit">
                        <img height="40px" src={item.playlist_pic} alt=""/>
                    </div>
                    <div title={item.playlist_label} className="col-xs-3 omit">
                        {item.playlist_label}
                    </div>
                    <div  className="col-xs-1 omit">
                        {item.playlist_amount}
                    </div>
                    <div  className="col-xs-1 omit">
                        {item.playlist_collection}
                    </div>
                    <div className="col-xs-2">
                        <button onClick={this.alertPlaylist.bind(this,item.playlist_id)}  className="btn btn-success btn-xs" data-toggle="modal" data-target="#changeSour">修改</button>
                        {/*<button onClick={this.alertPlaylist.bind(this,item.playlist_id)}  className="btn btn-success btn-xs" data-toggle="modal" >修改</button>*/}

                        <button onClick={this.deletePlaylist.bind(this,item.playlist_id)}  className="btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteSour">删除</button>
                    </div>
                </div>
            }

        });
        return listItems
    }

    render() {
        return (<div id='Playlist' className='tablebody'>
                {this.List()}
            </div>
        );
    }
}

export default PlaylistView;