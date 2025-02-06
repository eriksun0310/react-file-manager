import {
  IconFolderFilled,
  IconFileFilled,
  IconEdit,
  IconTrash,
  IconSearch,
} from "@tabler/icons-react";
import { useFileManager } from "../context/FileManagerContext";
import Path from "./Path";
import { useMemo, useState } from "react";
import { Menu, TextInput } from "@mantine/core";
import { FileType } from "../type";
import CreateNew from "./CreateNew";
import InfoModal from "./InfoModal";

const Workspace = () => {
  const { files, setFiles, currentFolder, setCurrentFolder } = useFileManager();

  const [infoOpened, setInfoOpened] = useState(false);

  // 控制右鍵選單的開啟狀態（此處用檔案 id 來控制）
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // 儲存目前正在編輯的檔案 id
  const [renameFileId, setRenameFileId] = useState<string | null>(null);

  // TextInput 的內容
  const [inputValue, setInputValue] = useState<string | null>(null);

  //  正在選擇的檔案
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  // 搜尋文字
  const [searchText, setSearchText] = useState<string>("");

  const renderFiles = useMemo(() => {
    return files?.filter(
      (f) => f.id !== "0" && f.parentId === currentFolder.id
    );
  }, [files, currentFolder]);

  // 當點擊右鍵時，設定選單開啟
  const clickRightEvent = ({
    e,
    file,
  }: {
    e: React.MouseEvent;
    file: FileType;
  }) => {
    setMenuOpenId(file.id);
    e.preventDefault();
  };

  // 編輯檔案名稱
  const textInputOnChange = ({
    file,
    newName,
  }: {
    file: FileType;
    newName: string;
  }) => {
    setInputValue(newName);
    const newFiles = files.map((f) => {
      if (f.id === file.id) {
        return {
          ...f,
          name: newName,
        };
      }
      return f;
    });

    setFiles(newFiles);
  };

  // 點擊詳細資訊事件
  const infoEvent = (file: FileType) => {
    setSelectedFile(file);
    setInfoOpened(true); // 打開 詳細資訊modal
    setMenuOpenId(null); // 關閉右鍵選單, 但不影響 詳細資訊modal
  };

  // 點擊 Rename 選項後，將檔案切換為編輯狀態
  const reNameEvent = (file: FileType) => {
    setRenameFileId(file.id);
    setInputValue(file.name);
    setMenuOpenId(null); // 關閉右鍵選單
  };

  // 模擬儲存新檔案名稱的動作，這裡可以做 API 請求或直接更新 state
  const saveRename = (file: FileType) => {
    console.log("Saving new name:", inputValue, "for file", file);
    // 更新檔案名稱的邏輯……
    setRenameFileId(null);
  };

  // 刪除事件
  const deleteEvent = (fileId: string) => {
    const newFiles = files.filter((f) => f.id !== fileId);

    setFiles(newFiles);
  };

  console.log("currentFolder", currentFolder);
  console.log("searchText", searchText);
  return (
    <>
      {/* 檔案資訊modal */}
      <InfoModal
        opened={infoOpened}
        close={() => setInfoOpened(false)}
        file={selectedFile!}
      />

      <div className="w-[90%] h-full">
        <Path searchText={searchText} setSearchText={setSearchText} />

        <div className="flex">
          {renderFiles.map((file) => {
            return (
              <div key={file.id} className="w-[12%]">
                <Menu
                  position="bottom-start"
                  withArrow
                  key={file.id}
                  arrowPosition="center"
                  opened={menuOpenId === file.id}
                  onClose={() => setMenuOpenId(null)}
                >
                  <Menu.Target>
                    <div
                      className="flex flex-col items-center m-2 cursor-pointer"
                      key={file.id}
                      onClick={() => {
                        console.log("click", file);
                        if (file.isDir) {
                          setCurrentFolder(file);
                        }
                      }}
                      onContextMenu={(e) =>
                        clickRightEvent({
                          e,
                          file,
                        })
                      }
                    >
                      {file.isDir ? (
                        <IconFolderFilled
                          stroke={2}
                          size={100}
                          color="#4ab7ff"
                        />
                      ) : (
                        <IconFileFilled size={100} color="#fdcd53" />
                      )}

                      {/* 根據是否正在編輯決定要顯示 TextInput 或純文字 */}
                      {renameFileId === file.id ? (
                        <TextInput
                          size="xs"
                          value={inputValue!}
                          onChange={(event) => {
                            textInputOnChange({
                              file,
                              newName: event.currentTarget.value,
                            });
                          }}
                          // 當 TextInput 失去焦點時保存變更
                          onBlur={() => saveRename(file)}
                          // 當按下 Enter 鍵時也儲存變更
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              saveRename(file);
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <div>{file.name}</div>
                      )}
                    </div>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconSearch size={14} />}
                      onClick={() => infoEvent(file)}
                    >
                      詳細資訊
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconEdit size={14} />}
                      onClick={() => reNameEvent(file)}
                    >
                      重新命名
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash size={14} />}
                      color="red"
                      onClick={() => deleteEvent(file.id)}
                    >
                      刪除
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            );
          })}

          <CreateNew />
        </div>
      </div>
    </>
  );
};

export default Workspace;
