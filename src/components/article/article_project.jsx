import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { BiPlusCircle,BiMinusCircle,BiSkipNextCircle,BiSkipPreviousCircle } from "react-icons/bi";
import { generateMedia } from 'styled-media-query';


import myPDF from './../../sample-pdf2.pdf';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import styled from 'styled-components';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
    
  }
};

const customMedia = generateMedia({
  lgDesktop: '1350px',
  mdDesktop: '1150px',
  tablet: '960px',
  mobile: '768px'
});


class ArticleProject extends Component {

  state = {
    pdfObject :  {url :'http://www.africau.edu/images/default/sample.pdf'},
    modalIsOpen: false,
    secondModalIsOpen: false,
    numPages: null,
    pageNumber: 1,
    firstNumber : 1,

    scale : 0.55,
    mobile_scale : 0.3,
    thumbnailScale : 1,

    videoModalIsOpen:false
  }





  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openSecondModal = () => {
    this.setState({ secondModalIsOpen: true });
  };

  closeSecondModal = () => {
    this.setState({ secondModalIsOpen: false });
  };


  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  handleClick = () => {
    this.props.onClick(this.props.item);
  }

  handleLike = () => {
    this.props.onLike(this.props.item, this.props.index);
  }



  render() {

  
    const { firstNumber,pageNumber, numPages,scale,thumbnailScale} = this.state;
    const classId = this.props.classId;
    const {title, group, groupName, members, pdf, likeCount, video, isClicked, isLike} = this.props.item;

    return (
  



      
      
      <article className="project-container">

      <div>



        <Modal style = {customStyles} isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <div className ="modal-Root-Screen">

                  <div className ="modal-PDF-area">
                    <Document
                    // file = {myPDF}
                    
                        file={pdf}
                        // file="https://cors-anywhere.herokuapp.com/http://www.africau.edu/images/default/sample.pdf"
                    // file = {this.state.pdfObject}
                    // file = {myPDF}
                    // file = {{data: JSON.parse("http://www.africau.edu/images/default/sample.pdf").data}}
                    // file = {{ url: 'http://www.africau.edu/images/default/sample.pdf', httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: true }}

                      onLoadSuccess={this.onDocumentLoadSuccess}>

             
                      {window.innerWidth >= 768  &&
                       <Page object-fit = "fill" height = {500} scale = {scale + 0.2} pageNumber={pageNumber} />
                       }       

                      {window.innerWidth < 768 &&
                      <Page width = {760} scale = {scale - 0.15} pageNumber={pageNumber} />
                       }



                    </Document>

                  </div>

                <div className = "modal-button-area">

                    <BiPlusCircle  color ="#174483" className ="modal-button" onClick={() => this.setState({scale : this.state.scale + 0.05})}>

                    </BiPlusCircle>
              

                      <BiMinusCircle color ="#174483" className ="modal-button" onClick={() => this.setState({scale : this.state.scale = this.state.scale - 0.05})}>
                        
                      </BiMinusCircle>



                        <BiSkipPreviousCircle color ="#174483" className ="modal-button-navi" onClick={() => this.state.pageNumber > 1 ?
                          this.setState({numPages : this.state.numPages,
                            pageNumber : this.state.pageNumber-1}) : null}>
                        
                      </BiSkipPreviousCircle>

                      <BiSkipNextCircle color ="#174483" className ="modal-button" onClick={() => this.state.pageNumber < numPages ?
                          this.setState({numPages : this.state.numPages,
                            pageNumber : this.state.pageNumber+1}) : null}>
                          
                    </BiSkipNextCircle>

                    <span class = "page-index">{pageNumber} / {numPages}</span>
               

                </div>
                          
                 </div>
     

        </Modal>


      </div>




      {/* 아티클 컨테이너 (비디오 제외) - 컴포넌트로 분리하기 */}
      <div className="article-container"> 

      <div className ="thumbnail-area">

      <Document onClick={this.openModal} 
                    // file="https://cors-anywhere.herokuapp.com/https://2020learningfair.s3.ap-northeast-2.amazonaws.com/static/proto.pdf"
                    // file ={"https://cors-anywhere.herokuapp.com/https://2020learningfair.s3.ap-northeast-2.amazonaws.com/static/pdf/03/p16.pdf"}

                    file={pdf}
                    // file = {myPDF}
                      onLoadSuccess={this.onDocumentLoadSuccess}>
                      <Page renderMode = {"canvas"} scale = {thumbnailScale} pageNumber={firstNumber} />
      </Document>
      </div>

        {/* 프로젝트 이미지 */}        
  

        {/* // 프로젝트 이미지 마무리 */}

        {/* 프로젝트 정보 */}
        <div className="project-info">
          <div className="project-title">{title}</div>
          <div className="project-contents">
            
            {groupName}

          </div>
          <div className="project-like">
          {/* <img src="/images/unlike-button.png" alt=""/> */}
            <button className="project-like-button" onClick={this.handleLike}><img src={ isLike ? 

            "/images/like-button-hand.png" : "/images/unlike-button-hand.png"} alt=""/></button>
            
            <span className="project-like-count">{likeCount}</span>
          </div>
        </div>
        {/* // 프로젝트 정보 마무리 */}

        {/* 그룹 정보 */}
        <div className="group-info">

          {/* 그룹 정보 컨테이너 */}

  
     
  
            {/* 그룹 정보 컨테이너 */}
            <div className="group-info-container">
              <div className="teamname-area">
                {/* <div className="groupname-label"></div> */}
                <div className="groupname">{classId.id}분반 {group}조</div>
              </div>
              <div className="teammember-area">
                {/* <div className="groupmember-label"></div> */}
                <div className="groupmember">
                  {members}
                  {/* Yokomura Mae, 김예린, 서진경, 이채은 */}
                </div>
              </div>
            </div>
  
            {/* 동영상 버튼  */}
            
              <button className="show-video" onClick={this.handleClick}>발표 영상 보기</button>
            
            
       
          {/* // 그룹 정보 마무리 */}
  
        </div>
        {/* // 아티클 컨테이너 마무리 */}
        
</div>
 

      {/* video part */}

      <div className="video_area_wrapper">
        <ReactPlayer 
          className="react-player" 
          url={video}
          width='100%'
          height='100%'
          style={{ display : (isClicked ? 'block' : 'none') }}
          // playing
          controls
        />
      </div> 

      {/* modal */}
      <ModalOverlay visible={isClicked} onClick={this.handleClick}>
      <ModalWrapper tabIndex="-1" visible={isClicked} >
        <ModalInner tabIndex="0" className="modal-inner">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          {/* <button className="close-btn" onClick={this.handleClick}><IoIosCloseCircleOutline size="36" color="#154483"/></button> */}
        </div>
        
        <ReactPlayer 
          className="react-player"  
          url={video}
          width='100%'
          height='100%'
          controls
          playing={isClicked}
        />
        </ModalInner>
      </ModalWrapper>
      </ModalOverlay>


    </article>
    );
  }
}

// modal style component (모달창 스타일 컴포넌트)


const ModalWrapper = styled.div`
  ${customMedia.lessThan('mobile')`
    display: none;
  `}
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  ${customMedia.lessThan('mobile')`
  display: none;
  `}
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  ${customMedia.lessThan('mobile')`
  display: none;
  `}
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 50vw;
  max-width: 1280px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 10px 5px;
`

export default ArticleProject;

