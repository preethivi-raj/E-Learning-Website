
import Loading from './Loading';

const NotesSidebar = ({course}) => {

    const notes = course.notes;
   
    return (
        <div>
            {
                notes ? (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-green-500">Notes</h2>
            <ul className="space-y-2">
                {notes.map((note) => (
                    <a  href={note.link} rel="noreferrer" target="_blank" key={note._id} className=' flex bg-green-400 rounded-md p-2 hover:text-white '>
                        {note.text}
                    </a>
                ))}
            </ul>
        </div>
                ) :(
                    <Loading/>
                )
            }
        </div>
    );
};

export default NotesSidebar;
