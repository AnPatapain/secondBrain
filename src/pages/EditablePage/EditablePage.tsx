import React, {useEffect, useState} from "react";
import uid from "../../utils/uid";
import EditableBlock from "../../components/EditableBlock/EditableBlock";
import setCaretToEnd from "../../utils/setCaretToEnd";

interface Block {
    id: string,
    html: string,
    tag: string
}

const initialBlock: Block = {
    id: uid(),
    html: "block 1",
    tag: "p"
}


const EditablePage: React.FC = () => {
    const [blocks, setBlocks] = useState<Block[]>([initialBlock]);
    const [currentBlock, setCurrentBlock] = useState<Block>(initialBlock);


    useEffect(() => {
        console.log("currentBlock", currentBlock);
        if(currentBlock) {
            const currentDomBlock = document.getElementById(currentBlock.id);
            if(currentDomBlock) {
                currentDomBlock.focus();
                setCaretToEnd(currentDomBlock);
            }
        }
    }, [currentBlock]);

    const updatePageHandler = (block: {id: string, html: string, tag: string}) => {
        const block_index = blocks.map(b => b.id).indexOf(block.id);
        const updateBlocks = [...blocks];
        updateBlocks[block_index] = {
            ...updateBlocks[block_index],
            html: block.html,
            tag: block.tag
        };
        setBlocks(updateBlocks);
    }

    const addBlockHandler = (currentBlock: {id: string, ref: any}) => {
        const newBlock = {id: uid(), html: "", tag: "p"};
        const updateBlocks = [...blocks];
        const index_currentBlock = updateBlocks.map((b) => b.id).indexOf(currentBlock.id);
        updateBlocks.splice(index_currentBlock + 1, 0, newBlock);
        setBlocks(updateBlocks);
        setCurrentBlock(newBlock);
    }

    const deleteBlockHandler = (currentBlock: {id: string, ref: any}) => {
        const previousDomBlock = currentBlock.ref.previousElementSibling;
        if(previousDomBlock) {
            const updateBlocks = [...blocks];
            const currentIndex = blocks.map(b => b.id).indexOf(currentBlock.id);
            const previousBlock = updateBlocks[currentIndex - 1];
                updateBlocks.splice(currentIndex, 1);
            setBlocks(updateBlocks);
            setCurrentBlock(previousBlock);
        }
    }

    const changeBlock = (currentBlock: {id: string, ref: any}, event: 'keyUp' | 'keyDown' | 'mouseClick') => {
        if(event === 'keyUp') {
            const previousDomBlock = currentBlock.ref.previousElementSibling;
            if(previousDomBlock) {
                const currentIndex = blocks.map(block => block.id).indexOf(currentBlock.id);
                const previousBlock = blocks[currentIndex - 1];
                setCurrentBlock(previousBlock);
            }
        }
        if(event === 'keyDown') {
            const nextBlockDom = currentBlock.ref.nextElementSibling;
            if(nextBlockDom) {
                const currentIndex = blocks.map(block => block.id).indexOf(currentBlock.id);
                const nextBlock = blocks[currentIndex + 1];
                setCurrentBlock(nextBlock);
            }
        }
        if(event === 'mouseClick') {
            const currentIndex = blocks.map(block => block.id).indexOf(currentBlock.id);
            setCurrentBlock(blocks[currentIndex]);
        }
    }


    return (
        <div className="Page">
            <h1>Daily diary 🏡📒</h1>
            {blocks.map((block, key) => {
                return (
                    <EditableBlock key={key}
                                   id={block.id}
                                   html={block.html}
                                   tag={block.tag}
                                   updatePage={updatePageHandler}
                                   addBlock={addBlockHandler}
                                   deleteBlock={deleteBlockHandler}
                                   changeBlock={changeBlock}
                    />
                )
            })}
        </div>
    );
}

export default EditablePage;