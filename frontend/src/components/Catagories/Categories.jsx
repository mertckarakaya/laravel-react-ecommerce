import { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const apiUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchCategories =async () => {
            try {
                const response = await axios.get(`${apiUrl}/web/categories`,{
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setCategories(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);
    return (
        <section className="categories">
            <div className="container">
                <div className="section-title">
                    <h2>All Categories</h2>
                    <p>Summer Collection New Morden Design</p>
                </div>
                <ul className="category-list">
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.guid}
                            category={category}
                        />
                    ))}

                </ul>
            </div>
        </section>
    );
};

export default Categories;
