import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import baseUrl from "../baseUrl/baseUrl";

const Comments = ({ comments , courseId }) => {

  const  {data : authUser} = useQuery({queryKey:["authUser"]})

  const {mutate:deleteComment} = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await fetch(`${baseUrl}/course/comment/delete/${courseId}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id}),
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Comment Deleted");

    },
    onError: () => {
      toast.error("Error Deleting Comment");
      
    }
  });

  

  

  const handleDelete = (id) => {
    deleteComment(id);
  }
  return (
    <div>
      <div>
        {comments?.length > 0 ? (
          <ul className="list-disc  space-y-4">
            {comments.map((comment) => (
              <div  key={comment?._id}>
                <li
                  className="bg-green-100 text-gray-900  p-2 list-none rounded-lg shadow-md"
                >
                  <div className="avatar m-2 placeholder">
                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                      <span className="text-md uppercase">
                        {comment?.name.substring(0, 2)}
                      </span>
                    </div>
                  </div>
                  {comment.text}
                </li>
                 {authUser._id === comment.user && 
                  <button className="btn mt-1 bg-red-300 btn-sm " onClick={()=>handleDelete(comment?._id)}>Delete</button>  
                  }
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
