import os
import shutil

src_mvp = 'MVP'
dest_react = 'IntroCompSciPractice'

def copy_files():
    # components
    comp_dir = os.path.join(dest_react, 'src', 'components')
    os.makedirs(comp_dir, exist_ok=True)
    for comp in ['Sidebar.jsx', 'Sidebar.css', 'ProblemView.jsx', 'ProblemView.css', 
                 'CodeEditor.jsx', 'CodeEditor.css', 'ResultsPanel.jsx', 'ResultsPanel.css']:
        shutil.copy2(os.path.join(src_mvp, comp), os.path.join(comp_dir, comp))
        
    # data
    data_dir = os.path.join(dest_react, 'src', 'data')
    os.makedirs(data_dir, exist_ok=True)
    shutil.copy2(os.path.join(src_mvp, 'problems.js'), os.path.join(data_dir, 'problems.js'))
    
    # App
    shutil.copy2(os.path.join(src_mvp, 'App.jsx'), os.path.join(dest_react, 'src', 'App.jsx'))
    shutil.copy2(os.path.join(src_mvp, 'App.css'), os.path.join(dest_react, 'src', 'App.css'))
    
    # index.html
    shutil.copy2(os.path.join(src_mvp, 'index.html'), os.path.join(dest_react, 'index.html'))

    print("Copy successful.")

if __name__ == '__main__':
    copy_files()
