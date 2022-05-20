import "../../styles/list.css"
import { TodoFormType } from './../../App';



function ListItem({ username, email, task, done, index }:TodoFormType) {
    return ( 
        <>
            <article className="listitem">
                <div className="listitem_container">
                    <div className="listitem_num">
                        {
                            index
                        }
                    </div>
                    <div className="listitem_user">
                        {
                            username
                        }
                    </div>
                    <div className="listitem_mail">
                        {
                            email
                        }
                    </div>
                    <div className="listitem_task">
                        {
                            task
                        }
                    </div>
                    <div className="listitem_done">
                        <input type="checkbox" checked={done}/>
                    </div>
                </div>
            </article>
        </>
     );
}

export default ListItem;