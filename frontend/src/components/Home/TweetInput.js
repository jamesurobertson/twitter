import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTweet } from "../../store/entitiesSlice";
import { selectSessionUser } from "../../store/sessionSlice";
import { EditorState, convertToRaw } from "draft-js";
import { extractHashtagsWithIndices } from "@draft-js-plugins/hashtag";
import DraftEditor from "../Draft/DraftEditor";
import "@draft-js-plugins/mention/lib/plugin.css";
import "draft-js/dist/Draft.css";

const TweetInput = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(selectSessionUser);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const submitHandler = () => {
    const contentState = editorState.getCurrentContent();
    const lastBlock = contentState.getLastBlock();
    const hashes = extractHashtagsWithIndices(lastBlock.text).map((hash) => ({
      tag: hash.hashtag,
      medium: "tweet",
    }));
    const raw = convertToRaw(contentState);
    let mentionedUsers = [];
    for (let key in raw.entityMap) {
      const entity = raw.entityMap[key];
      if (entity.type === "mention") {
        mentionedUsers.push(entity.data.mention);
      }
    }
    const data = JSON.stringify(raw);
    dispatch(postTweet({ content: data, mentions: mentionedUsers, hashes }));
  };

  return (
    <div className="flex p-2 border mb-2">
      <div className="mr-2 h-20">
        <img
          className="rounded-full w-10 h-10 object-cover"
          src={sessionUser.profileImageUrl}
          alt={sessionUser.username}
        />
      </div>
      <div className="w-full flex-col justify-between">
        <DraftEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <div className="flex justify-end w-full">
          <button
            className="p-2 bg-blue-400 hover:bg-blue-500 rounded-full border-solid text-white"
            onClick={submitHandler}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetInput;
