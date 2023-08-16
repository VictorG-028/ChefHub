class SharedRecipe {
  final String title;
  final String createdBy;
  final String description;
  final String image;

  SharedRecipe({
    required this.title,
    required this.createdBy,
    required this.description,
    required this.image,
  });

  factory SharedRecipe.fromJson(Map<String, dynamic> json) {
    return SharedRecipe(
      title: json['title'],
      createdBy: json['created_by'],
      description: json['description'],
      image: json['image'],
    );
  }
}
