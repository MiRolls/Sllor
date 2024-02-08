import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const List = () => {
    const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

    const addItem = () => {
        const newItem = `Item ${items.length + 1}`;
        setItems([...items, newItem]);
    };

    const removeItem = (index: number) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    return (
        <div style={{ background: "red" }}>
            <button onClick={addItem}>Add Item</button>
            <ul>
                <AnimatePresence>
                    {items.map((item, index) => (
                        <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.5 }}
                        >
                            {item}
                            <button onClick={() => removeItem(index)}>Remove</button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
};

export default List;
