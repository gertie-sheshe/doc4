import React, { Component } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw, EditorState } from 'draft-js';
import popups from 'popups';
import toastr from 'toastr';

class Documents extends Component {
  display = id => {
    const { history, match } = this.props;
    history.push(`${match.url}/${id}`);
  };

  render() {
    const options = {
      BOLD: { element: 'b' },
      ITALIC: { element: 'i' },
      CODE: { element: 'code' },
      UNDERLINE: { element: 'u' },
    };
    let docNode;

    if (this.props.documents) {
      docNode = this.props.documents.map((doc, index) => {
        // console.log('DOC', typeof doc, doc);
        // let convertedContent = convertFromRaw(doc.content);

        // console.log('HAPPIER', JSON.stringify(doc.content));
        return (
          <div className="mdl-cell mdl-cell--12-col " key={index}>
            <li className="collection-item avatar">
              <i className="material-icons circle green">note</i>
              <span className="title">
                <h5>{doc.title}</h5>
              </span>
              <a href="#!" className="secondary-content">
                <i
                  id="readmore"
                  className="material-icons"
                  onClick={() => this.display(doc._id, doc)}
                >
                  subtitles
                </i>
                <div className="mdl-tooltip" htmlFor="readmore">
                  Read More
                </div>
              </a>
            </li>
          </div>
          // <div
          //   className="mdl-cell mdl-cell--12-col mdl-cell--6-col-desktop"
          //   key={index}
          // >
          //   <div className="demo-card-square mdl-card mdl-shadow--2dp">
          //     <div className="mdl-card__title mdl-card--expand">
          //       <h1 className="mdl-card__title-text">{doc.title}</h1>
          //     </div>
          //     <div
          //       className="mdl-card__supporting-text"
          //       // dangerouslySetInnerHTML={{
          //       //   __html: stateToHTML(
          //       //     convertedContent.getCurrentContent(),
          //       //     options,
          //       //   ),
          //       // }}
          //     />
          //     <div className="mdl-card__actions mdl-card--border">
          //       <a
          //         className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
          //         onClick={() => this.display(doc._id, doc)}
          //       >
          //         Read More
          //       </a>
          //     </div>
          //   </div>
          // </div>
        );
      });
    } else {
      docNode = <div>Loading...</div>;
    }

    return <div className="documents mdl-grid">{docNode}</div>;
  }
}

export default Documents;
